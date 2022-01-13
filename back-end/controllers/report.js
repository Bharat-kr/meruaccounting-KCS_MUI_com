import Activity from '../models/activity.js';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

// @desc    Generate Report
// @route   GET /activity/screenshot
// @access  Private

const generateReport = asyncHandler(async (req, res) => {
  try {
    const { clientId, projectId, userId } = req.body;

    const user = await User.findById(userId);

    const activity = await Activity.find({
      client: clientId,
      project: projectId,
    });

    res.json({ status: 'ok', data: activity });
  } catch (error) {
    throw new Error(error);
  }
});

export { generateReport };
