import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc    To get the screenshot delete Time
// @route   get /
// @access  public

const getTime = asyncHandler(async (req, res) => {
  try {
    const admin = await User.find({ role: "admin" });
    console.log(admin[0]);

    res.status(200).json({
      status: "ok",
      value: admin[0].screenshotDeleteTime,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    To update the current auto screenshot delete time
// @route   PATCH /
// @access  Private

const updateTime = asyncHandler(async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    for (let i = 0; i < admins.length; i++) {
      admins[i].screenshotDeleteTime = req.body.screenshotDeleteTime;
      await admins[i].save();
    }

    res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { getTime, updateTime };
