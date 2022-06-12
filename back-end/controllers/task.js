import Task from "../models/task.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";
import mongoose from "mongoose";

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

const getTasks = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const user = req.user;

      const tasks = await Task.aggregate([
        {
          $match: {},
        },
      ]);

      res.status(200).json({
        msg: "Success",
        data: tasks,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Edit task name
// @route   PATCH /tasks/editName
// @access  Private

const editName = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const user = req.user;
      const { name, _id } = req.body;

      await Task.updateOne(
        { _id: _id },
        {
          $set: {
            name: name,
          },
        }
      );

      res.status(200).json({
        msg: "Successfully edited name",
        // data: tasks,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Edit task employees
// @route   PATCH /tasks/editEmployees
// @access  Private

const editEmployees = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const user = req.user;
      const { _id, employeeId } = req.body;

      const task = await Task.find({ _id });

      if (task[0].employees.includes(employeeId)) {
        task[0].employees = task[0].employees.filter((id) => id != employeeId);
      } else task[0].employees = task[0].employees.push(employeeId);

      await Task.updateOne(
        { _id: _id },
        {
          $set: {
            employees: task[0].employees,
          },
        }
      );

      res.status(200).json({
        msg: "Successfully edited employees",
        // data: tasks,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Get task details
// @route   Post /tasks/details
// @access  Private

const getTaskDetails = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const user = req.user;
      const { _id } = req.body;
      console.log(_id);

      const allEmployees = await User.aggregate([
        {
          $match: {},
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
          },
        },
      ]);

      const task = await Task.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(_id),
          },
        },
      ]);

      task[0].allEmployees = allEmployees;

      res.status(200).json({
        msg: "Successfully fetched task details",
        data: task[0],
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

export {
  createTask,
  getTasks,
  deleteTask,
  editName,
  editEmployees,
  getTaskDetails,
};

// if (user.role === "admin") {
//   dteams = await Team.find()
//     .populate({
//       path: "members",
//       model: "User",
//       select: [
//         "firstName",
//         "lastName",
//         "email",
//         "settings",
//         "projects",
//         "role",
//         "payRate",
//         "status",
//       ],
//       populate: {
//         path: "projects",
//         model: "Project",
//         select: ["name", "projectLeader"],
//       },
//     })
//     .populate({
//       path: "manager",
//       model: "User",
//       select: ["-password", "-settings"],
//       populate: { path: "projects", model: "Project" },
//     });
// } else {
//   const { teams } = await User.findById(req.user._id)
//     .populate({
//       path: "teams",
//       model: "Team",
//       populate: {
//         path: "members",
//         model: "User",
//         select: [
//           "firstName",
//           "lastName",
//           "email",
//           "settings",
//           "projects",
//           "role",
//           "payRate",
//           "status",
//         ],
//         populate: {
//           path: "projects",
//           model: "Project",
//           select: ["name", "projectLeader"],
//         },
//       },
//     })
//     .populate({
//       path: "teams",
//       model: "Team",
//       populate: {
//         path: "manager",
//         model: "User",
//         select: ["-password", "-settings"],
//         populate: { path: "projects", model: "Project" },
//       },
//     });

//   dteams = teams;
// }
