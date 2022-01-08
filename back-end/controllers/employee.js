import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Get employee details by ID
// @route   GET /employee/:id
// @access  Private

const getEmployeeById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const employee = await User.findById(id);
  if (!employee) {
    res.status(404);
    throw new Error(`Employee not found`);
  }
  res.status(200).json({
    status: "Ok",
    data: employee,
  });
});

// @desc    Get employee details
// @route   GET /employee/employeeList
// @access  Private

const getEmployeeList = asyncHandler((req, res) => {
  const user = req.user;
  if (!user.isManager == true) {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
  const employees = user.employees;
  const team = user.team.populate();
  res.status(200).json({
    messsage: "Success",
    employees,
    team,
  });
});

// delete this function
// @desc    Create a new employee
// @route   POST /employee
// @access  Private

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const employee = new User(req.body);
    await employee.save();
    if (!employee) {
      res.status(500);
      throw new Error("Employee not created");
    }
    res.json({
      status: "Ok",
      data: employee,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Delete a employee
// @route   DELETE /employee/:id
// @access  Private

const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await User.findByIdAndDelete(id);
    if (employee) {
      res.status(500);
      throw new Error("Employee not deleted");
    }
    res.json({
      status: "Employee Deleted",
      data: employee,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Edit a employee
// @route   PATCH /edit/:id
// @access  Private

const editEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(employeeId, req.body);
    user.save();
    res.json({
      message: "User Settings Updated",
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Add a new employee
// @route   PATCH /employee/add/:id
// @access  Private

const addEmployee = asyncHandler(async (req, res) => {
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
  let totalHours;

  try {
    const employee = await User.findById(id);

    let Tday = Object.keys(req.body.day)[0];
    const day = req.body.day[Tday];

    let found = false;

    if (!employee) {
      res.status(404);
      throw new Error(`Employee not found ${id}`);
    }
    if (employee.day == undefined) {
      employee.days.push(req.body.day);
      const emp = await employee.save();

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

    res.json({
      status: "Success",
      data: employee,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export {
  addEmployee,
  getEmployeeList,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  editEmployee,
};
