import schedule from "node-schedule";
import User from "../models/user.js";
import findRemoveSync from "find-remove";

// get 90, 180, 360 days from user admin
// runs everyday
// sorts by date
// deletes from schema, activities, and file system.

schedule.scheduleJob(`0 0 * * *`, async () => {
  console.log("deleting ss");
  const admin = await User.find({ role: "admin" });
  // get time from admin.
  const time = admin[0].screenshotDeleteTime;
  findRemoveSync(__dirname + "/uploads", { age: { seconds: time } });
});
