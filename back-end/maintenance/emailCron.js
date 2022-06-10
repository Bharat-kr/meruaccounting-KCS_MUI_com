import cron from "node-cron";
import schedule from "node-schedule";
import Activity from "../models/activity.js";
import Reports from "../models/reports.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import puppeteer from "puppeteer";
import sgMail from "@sendgrid/mail";

const dayNames = [
  0,
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// edit generate report function
// edit save report function
// fetch is called from the website so no need to edit the fetch option
// a funtion to generate pdf from url(puppeteer)
// a function to mail
// delete report function
// a function to combine these all

schedule.scheduleJob(`20 31 14 * * *`, async () => {
  console.log("scheduling");
  // looking for reports every minute now, we only need to look once a day to avoid multiple schedules.
  // match by schedule true
  // match by todays day, date.
  const dayName = dayNames[dayjs().day()];
  const dayNo = dayjs().date();
  const schedules = await Reports.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ["$schedule", true],
            },
            {
              $eq: [
                "$user",
                mongoose.Types.ObjectId("62431c112ef0d76927367c0c"),
              ],
            },

            {
              $or: [
                {
                  $eq: [{ $arrayElemAt: ["$scheduleType", 0] }, "Daily"],
                },
                {
                  $switch: {
                    branches: [
                      {
                        case: {
                          $eq: [
                            { $arrayElemAt: ["$scheduleType", 0] },
                            "Weekly",
                          ],
                        },
                        then: {
                          $eq: [
                            { $arrayElemAt: ["$scheduleType", 1] },
                            dayName,
                          ],
                        },
                      },
                      {
                        case: {
                          $eq: [
                            { $arrayElemAt: ["$scheduleType", 0] },
                            "Monthly",
                          ],
                        },
                        then: {
                          $eq: [{ $arrayElemAt: ["$scheduleType", 1] }, dayNo],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        includeArrayIndex: "string",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  // cron single time each schedule(report)
  console.log(schedules.length);
  schedules.map(async (sched) => {
    // making a new date for cron to run only once.
    const time1 = Number(sched.scheduleType[2].split(":")[0]);
    const time2 = Number(sched.scheduleType[2].split(":")[1]);
    const date = new Date(2022, 3, 15, time1, time2, 0);
    console.log(time1, time2);
    console.log(date);
    schedule.scheduleJob(date, async function () {
      try {
        // generate report from the scheduled report to save the json file
        let reports = await generateReport({
          body: { dateRange: sched.scheduleType[0], ...sched.options },
        });
        console.log("generated");
        // save the report with appropriate url
        let saved = await saveReports({
          body: { ...sched, reports, userId: sched.user._id },
        });
        console.log(saved.url);

        // generate pdf
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(
          `http://localhost:3000/downloadReportPdf/${saved.url}`,
          {
            waitUntil: "networkidle2",
          }
        );
        await page.setViewport({ width: 1680, height: 1050 });
        let uniquePdf = uuidv4();
        await page.pdf({
          path: `./pdf/${uniquePdf}.pdf`,
          format: "A4",
        });

        // mail the pdf
        browser.close().then(mail(uniquePdf, sched.scheduledEmail));
        // console.log("sent");
        // delete the saved report and pdf
        deleteReports(saved.url);
        deletePdf(uniquePdf);
      } catch (err) {
        console.log(err);
      }
    });
  });
});

const generateReport = asyncHandler(async (req, res) => {
  try {
    let { clientIds, projectIds, userIds, dateOne, dateTwo, groupBy } =
      req.body;
    let { dateRange } = req.body;
    if (projectIds) {
      projectIds = projectIds.map((id) => {
        return mongoose.Types.ObjectId(id._id);
      });
    }
    if (userIds) {
      userIds = userIds.map((id) => {
        return mongoose.Types.ObjectId(id._id);
      });
    }
    if (clientIds) {
      clientIds = clientIds.map((id) => {
        return mongoose.Types.ObjectId(id._id);
      });
    }

    if (dateRange === "Daily") {
      dateOne = dayjs().format("DD/MM/YYYY");
      dateTwo = dayjs().format("DD/MM/YYYY");
    }
    if (dateRange === "Weekly") {
      dateOne = dayjs().startOf("week").format("DD/MM/YYYY");
      dateTwo = dayjs().format("DD/MM/YYYY");
    }
    if (dateRange === "Monthly") {
      dateOne = dayjs().startOf("month").format("DD/MM/YYYY");
      dateTwo = dayjs().format("DD/MM/YYYY");
    }

    const activity = await Activity.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $cond: [
                  projectIds,
                  {
                    $in: ["$project", projectIds],
                  },
                  { $not: { $in: ["$project", []] } },
                ],
              },
              {
                $cond: [
                  clientIds,
                  {
                    $in: ["$client", clientIds],
                  },
                  { $not: { $in: ["$client", []] } },
                ],
              },
              {
                $cond: [
                  userIds,
                  {
                    $in: ["$employee", userIds],
                  },
                  { $not: { $in: ["$employee", []] } },
                ],
              },
              {
                $and: [
                  {
                    $ne: ["$activityOn", ""],
                  },
                  {
                    $ne: ["$activityOn", "null"],
                  },
                  {
                    $ne: ["$activityOn", null],
                  },
                  {
                    $gte: [
                      {
                        $dateFromString: {
                          dateString: "$activityOn",
                          format: "%d/%m/%Y",
                          onNull: new Date(0),
                        },
                      },
                      {
                        $dateFromString: {
                          dateString: dateOne,
                          format: "%d/%m/%Y",
                          onNull: new Date(0),
                        },
                      },
                    ],
                  },
                  {
                    $lte: [
                      {
                        $dateFromString: {
                          dateString: "$activityOn",
                          format: "%d/%m/%Y",
                        },
                      },
                      {
                        $dateFromString: {
                          dateString: dateTwo,
                          format: "%d/%m/%Y",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      {
        $facet: {
          byProjects: [
            {
              $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
              },
            },
            {
              $unwind: {
                path: "$project",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $group: {
                _id: {
                  name: "$project.name",
                  _id: "$project._id",
                },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                actCount: {
                  $sum: 1,
                },
                totalHours: {
                  $sum: "$consumeTime",
                },
                avgPerformanceData: {
                  $avg: "$performanceData",
                },
              },
            },
          ],
          byClients: [
            {
              $lookup: {
                from: "clients",
                localField: "client",
                foreignField: "_id",
                as: "client",
              },
            },
            {
              $unwind: {
                path: "$client",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $group: {
                _id: {
                  firstName: "$client.name",
                  _id: "$client._id",
                },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                actCount: {
                  $sum: 1,
                },
                totalHours: {
                  $sum: "$consumeTime",
                },
                avgPerformanceData: {
                  $avg: "$performanceData",
                },
              },
            },
          ],
          byEmployees: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $group: {
                _id: {
                  firstName: "$employee.firstName",
                  employee: "$employee._id",
                  lastName: "$employee.lastName",
                },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                actCount: {
                  $sum: 1,
                },
                totalHours: {
                  $sum: "$consumeTime",
                },
                avgPerformanceData: {
                  $avg: "$performanceData",
                },
              },
            },
          ],
          byScreenshots: [
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },
            {
              $unwind: {
                path: "$screenshots",
              },
            },
            {
              $group: {
                _id: "$screenshots.title",
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                actCount: {
                  $sum: 1,
                },
                totalHours: {
                  $sum: "$consumeTime",
                },
                avgPerformanceData: {
                  $avg: "$performanceData",
                },
              },
            },
          ],
          byEP: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $unwind: {
                path: "$screenshots",
              },
            },
            {
              $group: {
                _id: {
                  userId: "$employee._id",
                  firstName: "$employee.firstName",
                  lastName: "$employee.lastName",
                  project: "$project",
                  client: "$client",
                },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                payRate: { $first: "$employee.payRate" },
                actCount: { $sum: 1 },
                totalHours: { $sum: "$consumeTime" },
                avgPerformanceData: { $avg: "$performanceData" },
                screenshots: { $push: "$screenshots" },
              },
            },
            {
              $lookup: {
                from: "projects",
                localField: "_id.project",
                foreignField: "_id",
                as: "project",
              },
            },
            {
              $lookup: {
                from: "clients",
                localField: "_id.client",
                foreignField: "_id",
                as: "client",
              },
            },
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },
            {
              $unwind: {
                path: "$client",
              },
            },
            {
              $unwind: {
                path: "$project",
              },
            },

            {
              $group: {
                _id: {
                  userId: "$_id.userId",
                  firstName: "$_id.firstName",
                  lastName: "$_id.lastName",
                },
                payRate: { $first: "$payRate" },
                projects: {
                  $push: {
                    internal: "$internal",
                    external: "$external",
                    client: "$client.name",
                    project: "$project.name",
                    count: "$actCount",
                    totalHours: "$totalHours",
                    avgPerformanceData: "$avgPerformanceData",
                    screenshots: "$screenshots",
                  },
                },
              },
            },
          ],
          byCE: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $unwind: {
                path: "$screenshots",
              },
            },
            {
              $group: {
                _id: {
                  userId: "$employee._id",
                  firstName: "$employee.firstName",
                  lastName: "$employee.lastName",
                  client: "$client",
                },
                screenshots: { $push: "$screenshots" },
                payRate: { $first: "$employee.payRate" },
                actCount: { $sum: 1 },
                totalHours: { $sum: "$consumeTime" },
                avgPerformanceData: { $avg: "$performanceData" },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
              },
            },
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },
            {
              $group: {
                _id: "$_id.client",

                users: {
                  $push: {
                    internal: "$internal",
                    external: "$external",
                    screenshots: "$screenshots",
                    payRate: "$payRate",
                    user: "$_id.userId",
                    firstName: "$_id.firstName",
                    lastName: "$_id.lastName",
                    count: "$actCount",
                    totalHours: "$totalHours",
                    avgPerformanceData: "$avgPerformanceData",
                  },
                },
              },
            },
            {
              $lookup: {
                from: "clients",
                localField: "_id",
                foreignField: "_id",
                as: "client",
              },
            },
          ],
          byDates: [
            {
              $group: {
                _id: "$activityOn",
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                actCount: { $sum: 1 },
                totalHours: { $sum: "$consumeTime" },
                avgPerformanceData: { $avg: "$performanceData" },
              },
            },
          ],
          byD: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $lookup: {
                from: "clients",
                localField: "client",
                foreignField: "_id",
                as: "client",
              },
            },
            {
              $unwind: {
                path: "$client",
              },
            },
            {
              $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
              },
            },
            {
              $unwind: {
                path: "$project",
              },
            },
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },
            {
              $project: {
                _id: 1,
                startTime: 1,
                endTime: 1,
                consumeTime: 1,
                performanceData: 1,
                activityOn: 1,
                screenshots: 1,
                "project.name": 1,
                "client.name": 1,
                "employee.firstName": 1,
                "employee.lastName": 1,
                "employee.payRate": 1,
              },
            },
          ],
          total: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $group: {
                _id: null,
                actCount: { $sum: 1 },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                totalHours: { $sum: "$consumeTime" },
                avgPayRate: { $avg: "$employee.payRate" },
                avgPerformanceData: { $avg: "$performanceData" },
              },
            },
          ],
          byA: [
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },

            {
              $unwind: {
                path: "$screenshots",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $group: {
                _id: {
                  ss: "$screenshots.title",
                  employee: "$employee._id",
                  firstName: "$employee.firstName",
                  lastName: "$employee.lastName",
                },
                actCount: { $sum: 1 },
                totalHours: { $sum: "$consumeTime" },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                avgPerformanceData: { $avg: "$performanceData" },
                screenshots: { $push: "$screenshots" },
              },
            },
            {
              $group: {
                _id: {
                  employee: "$_id.employee",
                  firstName: "$_id.firstName",
                  lastName: "$_id.lastName",
                },
                actCount: { $sum: 1 },
                screenshots: {
                  $push: {
                    screenshots: "$screenshots",
                    internal: "$internal",
                    external: "$external",
                    title: "$_id.ss",
                    actCount: { $sum: 1 },
                    totalHours: { $sum: "$consumeTime" },
                    avgPerformanceData: { $avg: "$avgPerformanceData" },
                  },
                },
              },
            },
          ],
          byPE: [
            {
              $lookup: {
                from: "users",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $unwind: {
                path: "$employee",
              },
            },
            {
              $unwind: {
                path: "$screenshots",
              },
            },
            {
              $group: {
                _id: {
                  userId: "$employee._id",
                  firstName: "$employee.firstName",
                  lastName: "$employee.lastName",
                  project: "$project",
                  client: "$client",
                },
                internal: {
                  $sum: { $cond: ["$isInternal", "$consumeTime", 0] },
                },
                external: {
                  $sum: { $cond: ["$isInternal", 0, "$consumeTime"] },
                },
                screenshots: { $push: "$screenshots" },
                payRate: { $first: "$employee.payRate" },
                actCount: { $sum: 1 },
                totalHours: { $sum: "$consumeTime" },
                avgPerformanceData: { $avg: "$performanceData" },
              },
            },

            {
              $group: {
                _id: { project: "$_id.project", client: "$_id.client" },
                users: {
                  $push: {
                    payRate: "$payRate",
                    screenshots: "$screenshots",
                    internal: "$internal",
                    external: "$external",
                    user: "$_id.userId",
                    firstName: "$_id.firstName",
                    lastName: "$_id.lastName",
                    count: "$actCount",
                    totalHours: "$totalHours",
                    avgPerformanceData: "$avgPerformanceData",
                  },
                },
              },
            },

            {
              $lookup: {
                from: "projects",
                localField: "_id.project",
                foreignField: "_id",
                as: "project",
              },
            },
            {
              $lookup: {
                from: "clients",
                localField: "_id.client",
                foreignField: "_id",
                as: "client",
              },
            },
            {
              $lookup: {
                from: "screenshots",
                localField: "screenshots",
                foreignField: "_id",
                as: "screenshots",
              },
            },
          ],
        },
      },
    ]);

    return activity;
  } catch (error) {
    throw new Error(error);
  }
});

const saveReports = asyncHandler(async (req, res) => {
  try {
    let {
      userId,
      share,
      url,
      reports,
      name,
      includeSS,
      includeAL,
      includePR,
      includeApps,
      options,
    } = req.body;
    // change url for a new url to be generated
    url = uuidv4();
    reports = reports;

    if (!options.dateTwo) {
      options.dateTwo = dayjs().format("DD/MM/YYYY");
    }

    let { firstName, lastName } = await User.findById(userId);
    let fileName = userId + "-" + new Date().getTime();

    // STEP : Writing to a file
    fs.writeFileSync(
      `./saved reports/${fileName}.json`,
      JSON.stringify(reports)
    );

    // make a new document for reports schema
    const saved = await Reports.create({
      schedule: false,
      share: true,
      options,
      user: userId,
      url,
      includeSS,
      includeAL,
      includePR,
      includeApps,
      name: name === "" ? `${firstName} ${lastName}` : name,
      fileName,
    });

    return saved;
  } catch (error) {
    throw new Error(error);
  }
});

const deleteReports = asyncHandler(async (url, res) => {
  try {
    const report = await Reports.find({ url: url });

    fs.stat(
      `./saved reports/${report[0].fileName}.json`,
      function (err, stats) {
        if (err) {
          return console.error(err);
        }

        // Delete a file
        let filename = `./saved reports/${report[0].fileName}.json`;
        let tempFile = fs.openSync(filename, "r");
        // try commenting out the following line to see the different behavior
        fs.closeSync(tempFile);
        fs.unlinkSync(filename);
      }
    );

    // Delete from database
    if (report) {
      // _id = report[0]._id;
      await Reports.deleteOne({ _id: report[0]._id });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deletePdf = (name) => {
  fs.stat(`./pdf/${name}.pdf`, function (err, stats) {
    if (err) {
      return console.error(err);
    }

    // Delete a file
    let filename = `./pdf/${name}.pdf`;
    let tempFile = fs.openSync(filename, "r");
    // try commenting out the following line to see the different behavior
    fs.closeSync(tempFile);
    fs.unlinkSync(filename);
  });
};

const mail = (uniquePdf, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let pathToAttachment = `./pdf/${uniquePdf}.pdf`;
  let attachment = fs.readFileSync(pathToAttachment).toString("base64");

  const msg = {
    // to: "it.meru02@gmail.com",
    // from: "it.meru02@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    attachments: [
      {
        content: attachment,
        filename: "attachment.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  sgMail.send(msg).catch((err) => {
    console.log(err);
  });
};

// async function test() {
//   const schedules = await Reports.aggregate([
//     {
//       $match: {
//         url: "71b44beb-a189-42ce-b904-5cffeabbc797",
//       },
//     },
//     // {
//     //   $lookup: {
//     //     from: "users",
//     //     localField: "user",
//     //     foreignField: "_id",
//     //     as: "user",
//     //   },
//     // },
//     {
//       $unwind: {
//         path: "$user",
//         includeArrayIndex: "string",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $limit: 1,
//     },
//   ]);
//   schedules.map(async (schedule) => {
//     //   generate report from the scheduled report to save the json file
//     let reports = await generateReport({ body: { ...schedule.options } });

//     //   save the report with appropriate url
//     let saved = await saveReports({
//       body: { ...schedule, reports, userId: schedule.user },
//     });
//     console.log(saved.url);
//     // generate pdf
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`http://localhost:3000/downloadReportPdf/${saved.url}`, {
//       waitUntil: "networkidle2",
//     });
//     await page.setViewport({ width: 1680, height: 1050 });
//     let uniquePdf = uuidv4();
//     await page.pdf({
//       path: `./pdf/${uniquePdf}.pdf`,
//       format: "A4",
//     });
//     // mail the pdf
//     browser.close().then(mail(uniquePdf));

//     // delete the saved report and pdf
//     deleteReports(saved.url);
//     deletePdf(uniquePdf);
//   });
// }
// // test();
