import User from "../models/user.js";
import Activity from "../models/activity.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";

import dayjs from "dayjs";
// import { mongoose } from "mongoose";

// @desc    Register new user
// @route   POST /register
// @access  Public
const ac = new AccessControl(grantsObject);

const register = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    isManager: req.body.isManager,
    password: req.body.password,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.role,
        settings: user.settings,
      },
      token: generateToken(user._id),
    });
  } else {
    throw new Error(
      "There was a problem in creating a new account. Please contact administrator"
    );
  }
});

// @desc    Login user
// @route   POST /login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.table([email, password]);

  if (!email || !password) {
    res.status(401);
    throw new Error("Missing credentials");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get logData to check role change
// @route   GET /roleCheck
// @access  Private

const roleCheck = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get common data
// @route   GET /commondata
// @access  Private

const commondata = asyncHandler(async (req, res) => {
  try {
    const userId = req.body._id ? req.body._id : req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "days",
        populate: {
          path: "activities ",
          populate: [
            { path: "screenshots", select: ["-employee"] },
            {
              path: "project",
              model: "Project",
              select: ["name"],
            },
          ],
        },
      })
      .populate({
        path: "projects",
        model: "Project",
        select: ["name"],
      })
      .populate({
        path: "clients",
        model: "Client",
        select: ["name"],
      });
    const yersterdayHours = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $eq: dayjs().add(-1, "day").format("DD/MM/YYYY"),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);
    const dailyHours = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $eq: dayjs().format("DD/MM/YYYY"),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const weeklyTime = await Activity.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$employee", user._id],
              },
              {
                $and: [
                  {
                    $ne: ["$activityOn", null],
                  },
                  {
                    $ne: ["$activityOn", ""],
                  },
                  {
                    $ne: ["$activityOn", "null"],
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
                          dateString: dayjs()
                            .startOf("week")
                            .format("DD/MM/YYYY"),
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
                          dateString: dayjs().format("DD/MM/YYYY"),
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
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const monthlyTime = await Activity.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$employee", user._id],
              },
              {
                $and: [
                  {
                    $ne: ["$activityOn", null],
                  },
                  {
                    $ne: ["$activityOn", ""],
                  },
                  {
                    $ne: ["$activityOn", "null"],
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
                          dateString: dayjs()
                            .startOf("month")
                            .format("DD/MM/YYYY"),
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
                          dateString: dayjs().format("DD/MM/YYYY"),
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
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const totalTime = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    if (!user) {
      res.status(404);
      throw new Error("No such user found");
    }

    res.status(200).json({
      status: "Fetched common data",
      user,
      yersterdayHours,
      dailyHours,
      weeklyTime,
      monthlyTime,
      totalTime,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Post team common data
// @route   POST /teamCommondata
// @access  Private

const teamCommondata = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      // let resArr = [];
      const userId = req.user._id;
      const arr = await User.aggregate([
        {
          $match: {
            _id: {
              $eq: userId,
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
      ]);
      if (!arr[0].members) {
        throw new Error("No member in team");
      }
      const userIds = arr[0].members;
      const act = await User.aggregate([
        {
          $match: {
            _id: {
              $in: userIds,
            },
          },
        },
        {
          $unset: [
            "settings",
            "password",
            "projects",
            "clients",
            "notifications",
            "days",
            "__v",
            "createdAt",
            "updatedAt",
            "avatar",
            "teams",
            "accountInfo",
          ],
        },
        {
          $lookup: {
            from: "activities",
            let: {
              uId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$employee", "$$uId"],
                  },
                },
              },
              {
                $group: {
                  _id: "null",
                  count: {
                    $sum: 1,
                  },
                  today: {
                    $sum: {
                      $cond: [
                        {
                          $eq: ["$activityOn", dayjs().format("DD/MM/YYYY")],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  totalHours: {
                    $sum: "$consumeTime",
                  },
                  week: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $ne: ["$activityOn", null],
                            },
                            {
                              $ne: ["$activityOn", ""],
                            },
                            {
                              $ne: ["$activityOn", "null"],
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
                                    dateString: dayjs()
                                      .startOf("week")
                                      .format("DD/MM/YYYY"),
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
                                    dateString: dayjs().format("DD/MM/YYYY"),
                                    format: "%d/%m/%Y",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  month: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $ne: ["$activityOn", null],
                            },
                            {
                              $ne: ["$activityOn", ""],
                            },
                            {
                              $ne: ["$activityOn", "null"],
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
                                    dateString: dayjs()
                                      .startOf("month")
                                      .format("DD/MM/YYYY"),
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
                                    dateString: dayjs().format("DD/MM/YYYY"),
                                    format: "%d/%m/%Y",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  yesterday: {
                    $sum: {
                      $cond: [
                        {
                          $eq: [
                            "$activityOn",
                            dayjs().add(-1, "day").format("DD/MM/YYYY"),
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  avgPerformanceData: {
                    $avg: "$performanceData",
                  },
                },
              },
            ],
            as: "time",
          },
        },
      ]);

      res.status(200).json({
        status: "Fetched team common data",
        data: act,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
});

// @desc    Generate Report
// @route   GET /report
// @access  Private
import mongoose from "mongoose";
const generateReportByIds = asyncHandler(async (req, res) => {
  try {
    let { clientIds, projectIds, userIds, dateOne, dateTwo } = req.body;
    const employeeDetails = [];

    if (!projectIds) {
      projectIds = null;
    } else {
      projectIds = projectIds.map((id) => {
        return mongoose.Types.ObjectId(id);
      });
    }
    // if (!clientIds) {
    //   clientIds = null;
    // } else {
    //   clientIds = clientIds.map((id) => {
    //     return mongoose.Types.ObjectId(id);
    //   });
    // }
    if (!userIds) {
      userIds = null;
    } else {
      userIds = userIds.map((id) => {
        return mongoose.Types.ObjectId(id);
      });
    }

    // console.log(projectIds);

    if (!dateOne) dateOne = dayjs(-1).format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    // if (userId) user = await User.findById(userId);
    // else user = req.user;
    for (var i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const activity = await Activity.aggregate([
        {
          $match: {
            $and: [
              // { project: { $in: projectIds } },
              // { client: { $in: clientIds } },
              { employee: { $eq: userId } },
              { activityOn: { $gte: dateOne, $lte: dateTwo } },
            ],
          },
        },

        {
          $group: {
            _id: {
              userId: "$employee",
              project: "$project",
              client: "$client",
            },
            actCount: { $sum: 1 },
            totalHours: { $sum: "$consumeTime" },
            avgPerformanceData: { $avg: "$performanceData" },
          },
        },

        // {
        //   $group: {
        //     _id: "$_id.userId",
        //     projects: {
        //       $push: {
        //         client: "$_id.client",
        //         project: "$_id.project",
        //         count: "$actCount",
        //         totalHours: "$totalHours",
        //         avgPerformanceData: "$performanceData",
        //       },
        //     },
        //   },
        //   $group: {
        //     _id: "$_id.userId",
        //     clients: {
        //       $push: {
        //         client: "$_id.client",
        //         count: "$actCount",
        //         totalHours: "$totalHours",
        //         avgPerformanceData: "$performanceData",
        //       },
        //     },
        //     count: { $sum: "$actCount" },
        //   },
        // },
      ]);
      employeeDetails.push(activity);
    }

    res.json({
      status: "ok",
      employeeDetails,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// @desc    Get hours by date
// @route   GET /dateHours
// @access  Private

const dateHours = asyncHandler(async (req, res) => {
  const incomingDate = req.body.incomingDate;
  try {
    const userId = req.body._id ? req.body._id : req.user._id;
    const user = await User.findById(userId);

    let dateString = incomingDate;

    let dateParts = dateString.split("/");

    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const yersterdayHours = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $eq: dayjs(dateObject).add(-1, "day").format("DD/MM/YYYY"),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);
    const dailyHours = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $eq: dayjs(dateObject).format("DD/MM/YYYY"),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const weeklyTime = await Activity.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$employee", user._id],
              },
              {
                $and: [
                  {
                    $ne: ["$activityOn", null],
                  },
                  {
                    $ne: ["$activityOn", ""],
                  },
                  {
                    $ne: ["$activityOn", "null"],
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
                          dateString: dayjs(dateObject)
                            .startOf("week")
                            .format("DD/MM/YYYY"),
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
                          dateString: dayjs(dateObject).format("DD/MM/YYYY"),
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
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const monthlyTime = await Activity.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ["$employee", user._id],
              },
              {
                $and: [
                  {
                    $ne: ["$activityOn", null],
                  },
                  {
                    $ne: ["$activityOn", ""],
                  },
                  {
                    $ne: ["$activityOn", "null"],
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
                          dateString: dayjs(dateObject)
                            .startOf("month")
                            .format("DD/MM/YYYY"),
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
                          dateString: dayjs(dateObject).format("DD/MM/YYYY"),
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
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    const totalTime = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
          avgPerformanceData: { $avg: "$performanceData" },
          docCount: { $sum: 1 },
        },
      },
    ]);

    if (!user) {
      res.status(404);
      throw new Error("No such user found");
    }

    res.status(200).json({
      status: "Fetched hours by date",
      // user,
      yersterdayHours,
      dailyHours,
      weeklyTime,
      monthlyTime,
      totalTime,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Download app
// @route   GET /download_ia32
// @access  Public
const downloadApp = asyncHandler(async (req, res) => {
  try {
    res.setHeader("Content-disposition", "attachment; filename=" + "Meru.exe");
    //filename is the name which client will see. Don't put full path here.

    res.setHeader("Content-type", "application/x-msdownload"); //for exe file

    //checking for the file status if its there or not
    fs.stat("./app/meruSetup.exe", (error, stats) => {
      if (error) {
        res.status(404).json({
          message: "file not Found",
        });
      }
    });
    var file = fs.createReadStream("./app/meruSetup.exe");
    //replace filepath with path of file to send

    file.pipe(res);
    //send file
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Change Account Info
// @route   patch /accountInfo
// @access  Public
const updateTimeZone = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.accountInfo.timeZone = req.body.timeZone;
    await user.save();
    res.status(200).json({
      message: "Updated Succesfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export {
  downloadApp,
  login,
  register,
  commondata,
  dateHours,
  teamCommondata,
  generateReportByIds,
  roleCheck,
  updateTimeZone,
};
