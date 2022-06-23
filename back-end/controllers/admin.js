import User from "../models/user.js";
import Client from "../models/client.js";
import Project from "../models/project.js";
import Team from "../models/team.js";
import mongoose from "mongoose";
import Activity from "../models/activity.js";
import dayjs from "dayjs";
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

const adminCommondata = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      // let resArr = [];
      const userId = req.user._id;
      const arr = await User.aggregate([
        {
          $match: {},
        },
        {
          $unset: [
            "settings",
            "password",
            "projects",
            "clients",
            "notifications",
            "days",
            "__v",
            "createdAt",
            "updatedAt",
            "avatar",
            "teams",
            "accountInfo",
          ],
        },
        {
          $lookup: {
            from: "activities",
            let: {
              uId: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$employee", "$$uId"],
                  },
                },
              },
              {
                $group: {
                  _id: "null",
                  count: {
                    $sum: 1,
                  },
                  today: {
                    $sum: {
                      $cond: [
                        {
                          $eq: ["$activityOn", dayjs().format("DD/MM/YYYY")],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  totalHours: {
                    $sum: "$consumeTime",
                  },
                  week: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$activityOn",
                                dayjs().startOf("week").format("DD/MM/YYYY"),
                              ],
                            },
                            {
                              $lte: [
                                "$activityOn",
                                dayjs().format("DD/MM/YYYY"),
                              ],
                            },
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  month: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$activityOn",
                                dayjs().startOf("month").format("DD/MM/YYYY"),
                              ],
                            },
                            {
                              $lte: [
                                "$activityOn",
                                dayjs().format("DD/MM/YYYY"),
                              ],
                            },
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  yesterday: {
                    $sum: {
                      $cond: [
                        {
                          $eq: [
                            "$activityOn",
                            dayjs().add(-1, "day").format("DD/MM/YYYY"),
                          ],
                        },
                        "$consumeTime",
                        0,
                      ],
                    },
                  },
                  avgPerformanceData: {
                    $avg: "$performanceData",
                  },
                },
              },
            ],
            as: "time",
          },
        },
      ]);

      res.status(200).json({
        status: "Fetched admin common data",
        data: arr,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
});

// @desc    Update Currency settings
// @route   GET /admin/currency
// @access  Private

const changeCurrency = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("members");
  const newValue = req.body.currency;
  if (!newValue) {
    res.status(406).json({
      messsage: "Enter a valid Value",
    });
  }
  if (permission.granted) {
    try {
      const users = await User.find();

      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        user.settings.CurrencySymbol.individualValue = newValue;
        await user.save();
      }

      res.status(200).json({
        messsage: "Success",
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

export { getAllEmployee, getAllTeams, adminCommondata, changeCurrency };
