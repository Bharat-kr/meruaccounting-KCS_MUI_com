import cron from "node-cron";
import schedule from "node-schedule";
import Activity from "../models/activity.js";
import Reports from "../models/reports.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import puppeteer from "puppeteer";
import sgMail from "@sendgrid/mail";
import Project from "../models/project.js";
import Screenshot from "../models/screenshot.js";
import findRemoveSync from "find-remove";

// get 90, 180, 360 days from user admin
// runs everyday
// sorts by date
// deletes from schema, activities, and file system.

schedule.scheduleJob(`0 0 * * *`, async () => {
  console.log("deleting ss");
  const admin = await User.findOne({ _id: "62029f0e95b7843f88ab3183" });
  // get time from admin.
  // temp time here (90 days)
  const time = 7358000;
  findRemoveSync(__dirname + "/uploads", { age: { seconds: time } });
});
