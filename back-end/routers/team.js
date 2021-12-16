const express = require("express");
const Team = require("../models/team");
const User = require("../models/user");
const { authPass } = require("../controllers/authController");

const router = express.Router();

router.post("/create", authPass, async (req, res) => {
  const manager = req.user;
  console.log(manager);
  const { name } = req.body;
  if (!manager.role === "manager") {
    return res.status(401).json({
      status: "UnAuthorized",
    });
  }
  try {
    const team = new Team({ name });
    await team.save();
    console.log(manager._id.toHexString());
    team.manager = manager._id;
    manager.team.push(team._id.toHexString());
    console.log(team);
    console.log(manager.team);

    await manager.save();
    await team.save();
    res.status(201).json({
      status: "Created Team",
      data: team,
    });
  } catch (error) {
    console.log(error);
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
  if (!manager.role == "manager") {
    return res.json({
      message: "UnAuthorized",
    });
  }

  const employeeId = req.body.employeeId;
  const teamId = req.body.teamId;
  var alreadyMember = false;
  try {
    const team = await Team.findOne(teamId);
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

router.get("/getTeam/:id", authPass, async (req, res) => {
  const user = req.user;
  const teamId = req.params.id;

  if (!user) {
    return res.status(401).json({
      msg: "UnAuthorized",
    });
  }
  // const manager = await User.populate(user, { path: "team" });
  const team = await Team.findById(teamId);

  if (!team) {
    return res.status(404).json({
      msg: "No Team Found!!",
    });
  }

  console.log(team);
  // const team = await user.populate("team").execPopulate();
  const TeamMembers = await Team.populate(team, {
    path: "employees",
  });
  const teamMembers = TeamMembers.employees;

  const TeamProject = await Team.populate(team, {
    path: "projects",
  });
  const teamProject = TeamProject.projects;
  // const teamProject = team.populate("projects");
  // t.populate("my-path").execPopulate();
  res.json({
    msg: "Success",
    data: {
      team,
      teamMembers,
      teamProject,
    },
  });
});
module.exports = router;
