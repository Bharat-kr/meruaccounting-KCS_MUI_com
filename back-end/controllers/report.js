import Activity from "../models/activity.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Generate Report
// @route   GET /activity/screenshot
// @access  Private

const generateReport = asyncHandler(async (req, res) => {
  try {
    const { clientId, projectId, userId } = req.body;

    let user;
    if (userId) user = await User.findById(userId);
    else user = req.user;

    const activity = await Activity.find({
      client: clientId,
      project: projectId,
    });

    function reducer(previous, current, index, array) {
      const returns = previous + current;
      console.log(
        `previous: ${previous}, current: ${current}, index: ${index}, returns: ${returns}`
      );
      return returns;
    }

    const sum = activity.reduce(reducer);
    res.json({
      status: "ok",
      data: sum,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { generateReport };
