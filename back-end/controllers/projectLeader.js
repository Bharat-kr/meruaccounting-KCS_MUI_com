import User from "../models/user.js";
import Client from "../models/client.js";
import Project from "../models/project.js";
import Team from "../models/team.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import Activity from "../models/activity.js";
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
      const members = await Project.aggregate([
        {
          $match: {
            projectLeader: req.user._id,
          },
        },
        {
          $unwind: {
            path: "$employees",
          },
        },
        {
          $group: {
            _id: "$projectLeader",
            employees: {
              $addToSet: "$employees",
            },
          },
        },
      ]);

      console.log(members);
      let userIds;
      if (members.length !== 0) {
        userIds = members[0].employees;
      } else {
        userIds = false;
      }
      const act = await User.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $cond: [
                    userIds,
                    {
                      $in: ["$_id", userIds],
                    },
                    { $in: ["$_id", []] },
                  ],
                },
              ],
            },
          },
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
        status: "ok",
        data: act,
      });
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

export { getProjectMembers };
