const express = require("express");
const Team = require("../models/team");
const User = require("../models/user");
const { authPass } = require("../controllers/authController");

const router = express.Router();

router.post("/create", authPass, async (req, res) => {
  const manager = req.user;
  console.log(manager);
  const { name } = req.body;
  try {
    const team = new Team({ name });
    await team.save();
    team.manager = manager._id;
    await team.save();
    res.status(201).json({
      status: "Created Team",
      data: team,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.post("/add/:id", authPass, async (req, res) => {
  const id = req.params.id;
  const employee = req.user;
  if (employee.role === "manager") {
    try {
      co;
      console.log(team);
      await team.save();
      team.employees.push(id);
      await team.save();

      res.json({
        status: "Ok",
        data: team,
      });
    } catch (error) {
      res.json({
        status: "Error",
        data: error,
      });
    }
  } else {
    res.json({
      message: "UnAuthorized",
    });
  }
});

router.patch("/updateMember", authPass, async (req, res) => {
  const manager = req.user;

  const employeeId = req.body.employeeId;
  const teamId = req.body.teamId;
  var alreadyMember = false;
  try {
    const team = await Team.findOne({ manger: manager._id });
    console.log(team);
    team.employees.forEach((employee) => {
      console.log(employee);
      console.log(employeeId);

      if (employee.equals(employeeId)) {
        console.log("Inside IF");
        alreadyMember = true;
      }
    });
    if (alreadyMember == true) {
      return res.json({
        status: "Ok",
        data: "Already A Member",
      });
    }
    team.employees.push(employeeId);
    await team.save();

    res.json({
      status: "Ok",
      data: team,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.delete("/removeMember", async (req, res) => {
  const employeeId = req.body.employeeId;

  const teamId = req.body.teamId;

  var alreadyMember = false;

  try {
    const team = await Team.findById(teamId);
    console.log(team);
    team.employees.forEach((employee, index) => {
      console.log(employee);
      console.log(employeeId);

      if (employee.equals(employeeId)) {
        console.log("Inside IF");
        alreadyMember = true;
        team.employees.splice(index, 1);
      }
    });

    if (alreadyMember == false) {
      return res.json({
        status: "Ok",
        data: "No Member Found",
      });
    }

    await team.save();

    res.json({
      status: "Ok",
      data: team,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});
module.exports = router;
