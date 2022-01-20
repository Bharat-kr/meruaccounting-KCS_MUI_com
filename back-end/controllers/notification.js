import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// @desc    To send notifications to user
// @route   POST notify/:id
// @access  Private

const sendNotification = asyncHandler(async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error(`${employeeId} not found`);
    }

    const notification = {
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
      type: req.body.type,
    };

    employee.notifications.push(notification);

    await employee.save();

    res.status(201).json({
      status: 'ok',
      employee,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    To read notifications by user
// @route   PATCH notify/:id
// @access  Private

const readNotification = asyncHandler(async (req, res) => {
  try {
    const notificationId = req.params.id;
    const employeeId = req.user._id;
    const employee = await User.findById(employeeId);

    employee.notifications.forEach((not) => {
      if (not._id.toHexString() === notificationId) not.isUnRead = true;
    });

    res.status(200).json(employee.notifications);
  } catch (error) {
    throw new Error(error);
  }
});

export { sendNotification, readNotification };
