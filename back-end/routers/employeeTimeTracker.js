const express = require("express");
const Team = require("../models/team");
const User = require("../models/user");

const router = express.Router();

var moment = require("moment"); // require
moment().format();
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const date = req.body.date;
  const hours = req.body.hours;
  const activityLevel = req.body.activityLevel;
  const time = req.body.time;
  const url = req.body.url;
  const taskName = req.body.taskName;

  try {
    const employee = await User.findById(id);

    if (!employee) {
      return res.status(404).send("Employee Not Found");
    }
    const day = {
      date: moment("1-12-1995", "DD-MM-YYYY"),
      hours: hours,
      screenShots: [
        {
          activityLevel: activityLevel,
          url: url,
          time: moment(time, "DD MM YYYY hh:mm:ss", true),
          taskName: taskName,
        },
      ],
    };
    employee.day.push(day);
    await employee.save();
    res.json({
      status: "Success",
      data: employee,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.get("/timeCount", (req, res) => {
  con;
});

module.exports = router;
