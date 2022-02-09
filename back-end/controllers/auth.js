import User from "../models/user.js";
import Activity from "../models/activity.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

import dayjs from "dayjs";
// import { mongoose } from "mongoose";

// @desc    Register new user
// @route   POST /register
// @access  Public

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
      });

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
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $gte: dayjs().startOf("week").format("DD/MM/YYYY"),
                $lte: dayjs().format("DD/MM/YYYY"),
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

    const monthlyTime = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: {
                $gte: dayjs().startOf("month").format("DD/MM/YYYY"),
                $lte: dayjs().format("DD/MM/YYYY"),
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
  try {
    let resArr = [];
    const userIds = req.body.userIds;
    console.log(userIds);
    for (let i = 0; i < userIds.length; i++) {
      const user = await User.findById(userIds[i]).select(
        "role firstName lastName payRate lastActive email"
      );
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
            $and: [
              {
                employee: { $eq: user._id },
              },
              {
                activityOn: {
                  $gte: dayjs().startOf("week").format("DD/MM/YYYY"),
                  $lte: dayjs().format("DD/MM/YYYY"),
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

      const monthlyTime = await Activity.aggregate([
        {
          $match: {
            $and: [
              {
                employee: { $eq: user._id },
              },
              {
                activityOn: {
                  $gte: dayjs().startOf("month").format("DD/MM/YYYY"),
                  $lte: dayjs().format("DD/MM/YYYY"),
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
      let obj = {
        user,
        dailyHours,
        yersterdayHours,
        weeklyTime,
        monthlyTime,
        totalTime,
      };
      resArr.push(obj);
    }

    res.status(200).json({
      status: "Fetched team common data",
      data: resArr,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Generate Report
// @route   GET /report
// @access  Private
import mongoose from "mongoose";
const generateReportByIds = asyncHandler(async (req, res) => {
  try {
    let { clientIds, projectIds, userIds, dateOne, dateTwo } = req.body;
    console.log(req.body);
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

    console.log(projectIds);

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

export { login, register, commondata, teamCommondata, generateReportByIds };
