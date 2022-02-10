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

const getProjectMembers = asyncHandler(async (req, res) => {
  console.log(req.user);
  const permission = ac.can(req.user.role).readOwn("project");
  if (permission.granted) {
    try {
      const projects = await Project.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "users",
            localField: "employees",
            foreignField: "_id",
            as: "employees",
          },
        },
      ]);
      res.status(200).json({
        status: "ok",
        data: projects,
      });
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

export { getProjectMembers };
