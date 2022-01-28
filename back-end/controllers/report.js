import Activity from "../models/activity.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import mongoose from "mongoose";

// @desc    Generate Report
// @route   GET /report/1,2,3
// @access  Private

const generateReportOne = asyncHandler(async (req, res) => {
  try {
    let { clientId, projectId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs().format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { project: { $eq: mongoose.Types.ObjectId(projectId) } },
            { client: { $eq: mongoose.Types.ObjectId(clientId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
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

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const generateReportTwo = asyncHandler(async (req, res) => {
  try {
    let { projectId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs().format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { project: { $eq: mongoose.Types.ObjectId(projectId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
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

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const generateReportThree = asyncHandler(async (req, res) => {
  try {
    let { clientId, userId, dateOne, dateTwo } = req.body;

    if (!dateOne) dateOne = dayjs().format("DD/MM/YYYY");
    if (!dateTwo) dateTwo = dayjs().format("DD/MM/YYYY");

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            { client: { $eq: mongoose.Types.ObjectId(clientId) } },
            { employee: { $eq: user._id } },
            { activityOn: { $gte: dateOne, $lte: dateTwo } },
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

    res.json({
      status: "ok",
      data: activity,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { generateReportOne, generateReportTwo, generateReportThree };
