const express = require("express");
const { authPass } = require("../controllers/authController");

const User = require("../models/user");

const router = express.Router();
var moment = require("moment"); // require
moment().format();

router.patch("/add/:id", async (req, res) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const id = req.params.id;
  const name = req.body.name;
  const date = req.body.date;
  const hours = req.body.hours;
  const activityLevelTotal = req.body.activityLevelTotal;
  const activityLevel = req.body.activityLevel;
  const time = req.body.time;
  const url = req.body.url;
  const taskName = req.body.taskName;
  var totalHours;

  try {
    const employee = await User.findById(id);
    console.log(req.body.day);
    var Tday = Object.keys(req.body.day)[0];
    const day = req.body.day[Tday];
    console.log("This is a Day", day);
    console.log(Tday);
    var found = false;

    if (!employee) {
      return res.status(404).send("Employee Not Found");
    }
    if (employee.day == undefined) {
      console.log("Inside If");
      employee.days.push(req.body.day);
      const emp = await employee.save();
      console.log("This is a employeee", employee);
      console.log("This is emp", emp);
      return res.json({
        status: "Success",
        data: employee,
      });
    }
    employee.days.push(req.body.day);

    // var screenShot = {
    //   activityLevel: activityLevel,
    //   url: url,
    //   time: moment(time, "hh:mm:ss"),
    //   taskName: taskName,
    // };
    // const timeRange = {
    //   startTime: moment(startTime, "hh:mm:ss"),
    //   endTime: moment(endTime, "hh:mm:ss"),
    //   activityLevelTotal: activityLevelTotal,
    //   screenShots: screenShot,
    // };
    // employee.day.forEach(async (day, index) => {
    //   console.log(moment(day.date).format("DD/MM/YYYY"));
    //   console.log(date);
    //   if (moment(day.date).format("DD/MM/YYYY") === date) {
    //     console.log("Inside Date Equals");
    //     found = true;
    //     console.log(day.screenShots);
    //     day.timeRange.push(timeRange);
    //   } else {
    //     console.log("not found");
    //   }
    // });
    // if (found == false) {
    //   const day = {
    //     date: moment(date, "DD-MM-YYYY"),
    //     hours: hours,
    //     timeRange,
    //   };
    //   console.log(day);

    //   employee.day.push(day);
    // }

    const emp = await employee.save();
    console.log("This is a employeee", employee);
    console.log("This is emp", emp);
    res.json({
      status: "Success",
      data: employee,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "Error",
      data: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await User.findById(id);
  if (!employee) {
    return res.status(404).send("Employee Not Found");
  }
  res.json({
    status: "Ok",
    data: employee,
  });
});

router.post("/", async (req, res) => {
  try {
    const employee = new User(req.body);
    await employee.save();
    if (!employee) {
      return res.status(404).send("Employee Not Created");
    }
    res.json({
      status: "Ok",
      data: employee,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    const employee = new User(req.body);
    await employee.save();
    if (!employee) {
      return res.status(404).send("Employee Not Created");
    }
    res.json({
      status: "Ok",
      data: employee,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await User.findByIdAndDelete(id);
    if (employee) {
      return res.status(404).send("Employee Not deleted");
    }
    res.json({
      status: "Employee Deleted",
      data: employee,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.post("/changeSetting", authPass, async (req, res) => {
  const user = req.user;
  user.settings = req.body;
  try {
    user.save();
    res.json({
      message: "Settings Updated",
      data: user,
    });
  } catch (error) {
    res.json({
      message: "Error Occured",
      data: error,
    });
  }
});

router.get("/employeeList", authPass, (req, res) => {
  const user = req.user;

  if (!user.isManager == true) {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }

  const employees = user.employees;
  const team = user.team.populate();

  res.status(200).json({
    messsage: "Success",
    employees,
    team,
  });
});

module.exports = router;
