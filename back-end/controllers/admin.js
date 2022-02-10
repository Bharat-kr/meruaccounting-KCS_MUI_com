import User from "../models/user.js";
import Client from "../models/client.js";
import Project from "../models/project.js";
import Team from "../models/team.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";
// var weekday = require("dayjs/plugin/weekday");
import weekday from "dayjs/plugin/weekday.js";

const ac = new AccessControl(grantsObject);

// @desc    Get employee details
// @route   GET /employee/employeeList
// @access  Private

const getAllEmployee = asyncHandler(async (req, res) => {
  console.log(req.user);
  const permission = ac.can(req.user.role).readOwn("members");
  if (permission.granted) {
    try {
      const users = await User.find().select("_id firstName lastName");

      res.status(200).json({
        messsage: "Success",
        data: users,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

const getAllTeams = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      const teams = await Team.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "members",
          },
        },
      ]);
      res.status(201).json({
        status: "ok",
        data: teams,
      });
    } catch (err) {
      console.log(error);
      throw new Error(error);
    }
  }
});

export { getAllEmployee, getAllTeams };
