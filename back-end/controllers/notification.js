import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc    To send notifications to user
// @route   POST notify/:id
// @access  Private

const sendNotification = asyncHandler(async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error(`Employee not found`);
    }

    const notification = {
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
      type: req.body.type,
    };
    employee.notifications = [notification, ...employee.notifications];

    await employee.save();

    res.status(201).json({
      status: "ok",
      data: employee.notifications,
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
      if (not._id.toHexString() === notificationId) {
        not.isUnRead = false;
      }
    });
    await employee.save();

    res.status(200).json(employee.notifications);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    To delete notifications by user
// @route   DELETE notify/:id
// @access  Private

const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const notificationId = req.params.id;
    const employeeId = req.user._id;
    const employee = await User.findById(employeeId);

    employee.notifications = employee.notifications.filter(
      (not) => not._id.toHexString() !== notificationId
    );
    await employee.save();

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

export { sendNotification, readNotification, deleteNotification };
