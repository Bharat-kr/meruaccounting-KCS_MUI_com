import cron from "node-cron";
import schedule from "node-schedule";
import Activity from "../models/activity.js";
import Project from "../models/project.js";
import Reports from "../models/reports.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import puppeteer from "puppeteer";
import sgMail from "@sendgrid/mail";
import Screenshot from "../models/screenshot.js";
import findRemoveSync from "find-remove";

schedule.scheduleJob(`0 * * * *`, async () => {
  console.log("notifying");
  // get projects
  const projects = await Project.aggregate([
    {
      $match: {
        $expr: {
          $lte: ["$budgetTime", "$consumeTime"],
        },
      },
    },
  ]);

  projects.forEach((pro) => {
    const noti = {
      title: "Budget Hours Exceeded",
      description: `Project hours exceeded for ${pro.name} project`,
      avatar: "if there is any",
      type: "projects",
    };
    pro.employees.forEach((emp) => {
      sendNotification(emp, noti);
    });
  });
});

const sendNotification = asyncHandler(async (emp, noti) => {
  try {
    const employee = await User.findById(emp);
    if (!employee) {
      throw new Error(`Employee not found`);
    }

    const notification = {
      title: noti.title,
      description: noti.description,
      avatar: noti.avatar,
      type: noti.type,
    };
    employee.notifications = [notification, ...employee.notifications];

    await employee.save();
  } catch (error) {
    throw new Error(error);
  }
});
