import Activity from "../models/activity.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc    Generate Report
// @route   GET /report
// @access  Private

const generateReport = asyncHandler(async (req, res) => {
  try {
    const { clientId, projectId, userId, dateOne, dateTwo } = req.body;
    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;
    console.log(user._id);

    const activity = await Activity.aggregate([
      {
        $match: {
          $and: [
            {
              project: { $eq: mongoose.Types.ObjectId(projectId) },
            },
            {
              client: { $eq: mongoose.Types.ObjectId(clientId) },
            },
            {
              employee: { $eq: user._id },
            },
            {
              activityOn: { $gte: dateOne, $lte: dateTwo },
            },
          ],
        },
      },
      {
        $group: {
          _id: user._id,
          totalHours: { $sum: "$consumeTime" },
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

export { generateReport };
