import mongoose from "mongoose";
// models
import Activity from "../models/activity.js";
import User from "../models/user.js";
import Project from "../models/project.js";
import Reports from "../models/reports.js";
// utils
import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import moment from "moment";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import puppeteer from "puppeteer";
import { v4 as uuidv4 } from "uuid";

// @desc    Generate Report
// @route   GET /report
// @access  Private

const generateReport = asyncHandler(async (req, res) => {
  try {
    let { clientIds, projectIds, userIds, dateOne, dateTwo, groupBy } =
      req.body;

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

    // console.log(clientIds, projectIds, userIds, dateOne, dateTwo);

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    // let user;
    // if (userId) user = await User.findById(userId);
    // else user = req.user;

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
            {
              $project: {
                _id: {
                  $dateFromString: {
                    dateString: "$_id",
                    format: "%d/%m/%Y",
                    onNull: new Date(0),
                  },
                },
                actCount: 1,
                internal: 1,
                external: 1,
                totalHours: 1,
                avgPerformanceData: 1,
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: { $dateToString: { format: "%d/%m/%Y", date: "$_id" } },
                actCount: 1,
                internal: 1,
                external: 1,
                totalHours: 1,
                avgPerformanceData: 1,
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

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Save Report
// @route   POST /report/save
// @access  Private
const saveReports = asyncHandler(async (req, res) => {
  try {
    let {
      scheduleEmail,
      schedule,
      scheduleType,
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
    // very inefficient coz not proper default values in frontend
    if (!scheduleType[1]) {
      if (scheduleType[0] === "Weekly") {
        scheduleType[1] = "Monday";
      }
      if (scheduleType[0] === "Monthly") {
        scheduleType[1] = 1;
      }
    }

    // if (!options.userIds) {
    //   options.userIds = "All Employees";
    // }
    // if (!options.projectIds) {
    //   options.projectIds = "All Projects";
    // }
    // if (!options.clientIds) {
    //   options.clientIds = "All Clients";
    // }
    if (!options.dateTwo) {
      options.dateTwo = dayjs().format("DD/MM/YYYY");
    }

    let userId = req.user._id;
    // console.log(options);
    let { firstName, lastName } = await User.findById(userId);
    let fileName = userId + "-" + new Date().getTime();

    // STEP : Writing to a file
    fs.writeFileSync(
      `./saved reports/${fileName}.json`,
      JSON.stringify(reports)
    );

    // make a new document for reports schema
    const saved = await Reports.create({
      schedule,
      scheduleType,
      scheduleEmail,
      share,
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
    res.json({
      status: "Report saved",
      data: saved,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete Report
// @route   delete /report/delete/:url
// @access  Private
const deleteReports = asyncHandler(async (req, res) => {
  try {
    let { url } = req.params;
    // let _id;
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

    res.json({
      status: "Report Deleted",
      report,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Fetch Report
// @route   POST /report/fetch
// @access  Private
const fetchReports = asyncHandler(async (req, res) => {
  try {
    let { url } = req.body;
    const report = await Reports.find({ url: url }).populate({
      path: "user",
      model: "User",
      select: {
        password: 0,
        projects: 0,
        days: 0,
        clients: 0,
        teams: 0,
        settings: 0,
        notifications: 0,
      },
    });

    // Read users.json file
    let data = JSON.parse(
      fs.readFileSync(`./saved reports/${report[0].fileName}.json`, "utf8")
    );

    res.json({
      status: report[0].share ? "Report fetched" : "403",
      report: report[0].share ? data : "403",
      data: report[0].share ? report : "403",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Report Options
// @route   POST /report/options
// @access  Private
const reportOptions = asyncHandler(async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findById(_id);
    let employeesOptions;
    let projectsClientsOptions;
    if (user.role === "manager") {
      employeesOptions = await User.aggregate([
        {
          $match: {
            _id: {
              $eq: user._id,
            },
          },
        },
        {
          $lookup: {
            from: "teams",
            localField: "teams",
            foreignField: "_id",
            as: "teams",
          },
        },
        {
          $unwind: {
            path: "$teams",
          },
        },
        {
          $unwind: {
            path: "$teams.members",
          },
        },
        {
          $group: {
            _id: "$_id",
            members: {
              $addToSet: "$teams.members",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "members",
          },
        },
        {
          $addFields: {
            name: "$members.firstName" + "$members.lastName",
          },
        },
        {
          $project: {
            "members._id": 1,
            "members.firstName": 1,
            "members.lastName": 1,
          },
        },
      ]);

      projectsClientsOptions = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "projects",
            foreignField: "_id",
            as: "projects",
          },
        },
        {
          $unwind: {
            path: "$projects",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "projects.employees",
            foreignField: "_id",
            as: "projects.employees",
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "projects.client",
            foreignField: "_id",
            as: "projects.client",
          },
        },
        {
          $unwind: {
            path: "$projects.client",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            firstName: {
              $first: "$firstName",
            },
            lastName: {
              $first: "$lastName",
            },
            projects: {
              $addToSet: "$projects",
            },
            clients: {
              $addToSet: "$projects.client",
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            "projects.client.name": 1,
            "projects.client._id": 1,
            "projects.employees.firstName": 1,
            "projects.employees.lastName": 1,
            "projects.employees._id": 1,
            "projects.name": 1,
            "projects._id": 1,
            "clients._id": 1,
            "clients.name": 1,
          },
        },
      ]);
    }

    if (user.role === "employee") {
      employeesOptions = [
        {
          _id: user._id,
          members: [
            {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          ],
        },
      ];

      projectsClientsOptions = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "projects",
            foreignField: "_id",
            as: "projects",
          },
        },
        {
          $unwind: {
            path: "$projects",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "projects.client",
            foreignField: "_id",
            as: "projects.client",
          },
        },
        {
          $unwind: {
            path: "$projects.client",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            firstName: {
              $first: "$firstName",
            },
            lastName: {
              $first: "$lastName",
            },
            projects: {
              $addToSet: "$projects",
            },
            clients: {
              $addToSet: "$projects.client",
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            "projects.client.name": 1,
            "projects.client._id": 1,
            "projects.name": 1,
            "projects._id": 1,
            "clients._id": 1,
            "clients.name": 1,
          },
        },
      ]);
    }
    if (user.role === "projectLeader") {
      employeesOptions = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: "projects",
            let: {
              leader: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$projectLeader", "$$leader"],
                  },
                },
              },
            ],
            as: "projects",
          },
        },
        {
          $unwind: {
            path: "$projects",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$projects.employees",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            members: {
              $addToSet: "$projects.employees",
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "members",
          },
        },
        {
          $project: {
            "members._id": 1,
            "members.firstName": 1,
            "members.lastName": 1,
          },
        },
      ]);

      projectsClientsOptions = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: "projects",
            let: {
              leader: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$projectLeader", "$$leader"],
                  },
                },
              },
            ],
            as: "projects",
          },
        },
        {
          $unwind: {
            path: "$projects",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "projects.client",
            foreignField: "_id",
            as: "projects.client",
          },
        },
        {
          $unwind: {
            path: "$projects.client",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            firstName: {
              $first: "$firstName",
            },
            lastName: {
              $first: "$lastName",
            },
            projects: {
              $addToSet: "$projects",
            },
            clients: {
              $addToSet: "$projects.client",
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            "projects.client.name": 1,
            "projects.client._id": 1,
            "projects.name": 1,
            "projects._id": 1,
            "clients._id": 1,
            "clients.name": 1,
          },
        },
      ]);
    }

    if (user.role === "admin") {
      const members = await User.aggregate([
        {
          $match: {},
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
          },
        },
      ]);
      employeesOptions = [
        {
          _id: user._id,
          members,
        },
      ];

      projectsClientsOptions = await User.aggregate([
        {
          $match: {
            _id: user._id,
          },
        },
        {
          $lookup: {
            from: "projects",
            let: {
              leader: "$_id",
            },
            pipeline: [
              {
                $match: {},
              },
            ],
            as: "projects",
          },
        },
        {
          $unwind: {
            path: "$projects",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "projects.client",
            foreignField: "_id",
            as: "projects.client",
          },
        },
        {
          $unwind: {
            path: "$projects.client",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            firstName: {
              $first: "$firstName",
            },
            lastName: {
              $first: "$lastName",
            },
            projects: {
              $addToSet: "$projects",
            },
            clients: {
              $addToSet: "$projects.client",
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            "projects.client.name": 1,
            "projects.client._id": 1,
            "projects.name": 1,
            "projects._id": 1,
            "clients._id": 1,
            "clients.name": 1,
          },
        },
      ]);
    }
    res.json({
      status: "options generated",
      employeesOptions,
      projectsClientsOptions,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Fetch Saved Reports
// @route   GET /report/saved
// @access  Private
const savedReports = asyncHandler(async (req, res) => {
  try {
    let { _id } = req.user;

    const data = await Reports.aggregate([
      {
        $match: {
          user: _id,
        },
      },
      { $unset: ["options", "user", "updatedAt", "__v"] },
    ]);

    res.json({
      status: "Fetched Saved Reports",
      data,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Edit Saved Reports
// @route   PATCH /report/edit
// @access  Private
const editReports = asyncHandler(async (req, res) => {
  try {
    let { url, includeSS, includeAL, includePR, includeApps, name, share } =
      req.body;

    const report = await Reports.find({ url: url });

    let options = {
      includeSS: includeSS ? includeSS : report[0].includeSS,
      includeAL: includeAL ? includeAL : report[0].includeAL,
      includePR: includePR ? includePR : report[0].includePR,
      includeApps: includeApps ? includeApps : report[0].includeApps,
      name: name ? name : report[0].name,
      share: share ? share : report[0].share,
    };

    const data = await Reports.updateOne({ url: url }, [
      {
        $set: options,
      },
    ]);

    res.json({
      status: "Edited Saved Reports",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Download report pdf
// @route   GET /report/download/:url
// @access  Private
const downloadPdf = asyncHandler(async (req, res) => {
  try {
    let { url } = req.params;

    // generate pdf
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/downloadReportPdf/${url}`, {
      waitUntil: "networkidle0",
    });
    setTimeout(async () => {
      await page.setViewport({ width: 1680, height: 1050 });
      let uniquePdf = uuidv4();
      await page.pdf({
        path: `./pdf/${uniquePdf}.pdf`,
        format: "A4",
      });
      await browser.close();

      // DELETE THE REPORT FIRST(unknown error, not working after sending response)
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
          fs.closeSync(tempFile);
          fs.unlinkSync(filename);
        }
      );
      if (report) {
        await Reports.deleteOne({ _id: report[0]._id });
      }

      let file = fs.createReadStream(`./pdf/${uniquePdf}.pdf`, {
        highWaterMark: 128 * 1024,
      });
      let stat = fs.statSync(`./pdf/${uniquePdf}.pdf`);
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=sample.pdf",
        "Content-Transfer-Encoding": "Binary",
      });
      // file.pipe(res);
      file.on("open", function () {
        file.pipe(res);
      });
    }, 5000);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  downloadPdf,
  deleteReports,
  generateReport,
  saveReports,
  fetchReports,
  reportOptions,
  savedReports,
  editReports,
};
