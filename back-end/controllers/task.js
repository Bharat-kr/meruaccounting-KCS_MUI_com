import Task from "../models/task.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";

const ac = new AccessControl(grantsObject);

// @desc    Create a new task
// @route   POST /task
// @access  Private

const createTask = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).createOwn("project");
  if (permission.granted) {
    // get user and name from request
    const user = req.user;
    const { name } = req.body;
    try {
      const task = new Task({ name });
      if (!task) throw new Error("Error creating new task");

      // new task meta data
      task.createdBy = user._id;

      // await user.save();

      await task.save();

      res.status(201).json({
        status: "Successfully Created Task",
        data: task,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Delete a task
// @route   DELETE /task
// @access  Private

const deleteTask = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).createOwn("project");
  if (permission.granted) {
    // get id from request
    const { _id } = req.body;
    try {
      console.log(_id);
      const task = await Task.findById({ _id });
      console.log(task);
      if (!task) throw new Error("Error deleting task");

      // delete task
      await Task.deleteOne({ _id: _id });

      res.status(201).json({
        status: "Successfully Deleted Task",
        data: task,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Get user's all tasks
// @route   GET /tasks
// @access  Private

const getTasksByUser = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const employeeId = req.body.employeeId
        ? req.body.employeeId
        : req.user._id;
      const { projects } = await User.findById(employeeId)
        .populate({
          path: "projects",
          model: "Project",
          populate: { path: "client", select: "name" },
        })
        .populate({
          path: "projects",
          model: "Project",
          populate: {
            path: "employees",
            select: ["firstName", "lastName", "days"],
          },
        });

      res.status(200).json({
        msg: "Success",
        data: projects,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

export { createTask, getTasksByUser, deleteTask };
