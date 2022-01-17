import Team from "../models/team.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new team
// @route   POST /team/create
// @access  Private

const createTeam = asyncHandler(async (req, res) => {
  try {
    const manager = req.user;
    const teamName = req.body.name;
    const team = await Team.create({ name: teamName });
    if (!team) throw new Error("Error creating new team");

    team.members.push(manager._id);
    team.manager = manager._id;
    await team.save();

    manager.teams.push(team._id.toHexString());
    await manager.save();

    res.status(201).json({
      status: "New team created",
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Add member to team
// @route   PATCH /team/updateMember
// @access  Private
// @params  { teamId: " " , employeeMail: " "}

const updateMember = asyncHandler(async (req, res) => {
  try {
    const { employeeMail, teamId } = req.body;
    let alreadyMember = false;

    const team = await Team.findById(teamId);
    if (!team) {
      res.status(404);
      throw new Error(`No team found ${teamId}`);
    }

    const newEmployee = await User.findOne({ email: employeeMail });
    if (!newEmployee) {
      res.status(404);
      throw new Error(`No employee found ${employeeMail}`);
    }

    const employeeId = newEmployee._id;
    team.members.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });
    if (alreadyMember) {
      return res.status(200).json({
        status: "Already A Member",
        data: team,
      });
    }

    team.members.push(employeeId);
    await team.save();

    res.status(200).json({
      status: "ok",
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Remove member
// @route   DELETE /team/updateMember
// @access  Private

const removeMember = asyncHandler(async (req, res) => {
  try {
    const { employeeId, teamId } = req.body;
    let alreadyMember = false;

    const team = await Team.findById(teamId);
    if (!team) {
      res.status(404);
      throw new Error(`No team found ${teamId}`);
    }

    const employee = await User.findById(employeeId);
    if (!employee) {
      res.status(404);
      throw new Error(`No employee found ${employeeId}`);
    }

    // deleting employee id from team
    team.members.forEach((member, index) => {
      if (member.equals(employeeId)) {
        alreadyMember = true;
        team.members.splice(index, 1);
      }
    });

    // deleting team id in employee if exists
    employee.teams.forEach((team, index) => {
      if (team.equals(teamId)) {
        alreadyMember = true;
        employee.teams.splice(index, 1);
      }
    });

    if (alreadyMember == false) {
      return res.status(200).json({
        status: "No Member Found",
        data: team,
      });
    }

    await team.save();
    await employee.save();

    res.status(200).json({
      status: "Ok",
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Get teams per id
// @route   GET /team/getTeam/:id
// @access  Private

const getTeamById = asyncHandler(async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId).populate({
      path: "members",
      model: "User",
      match: {
        $or: [{ status: "null" }, { status: "paused" }],
      },
      select: ["fistName", "lastName", "email", "status"],
    });

    if (!team) {
      res.status(404);
      throw new Error(`No team found ${teamId}`);
    }

    res.status(200).json({
      status: "Success",
      data: team,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// @desc    Get all teams of user
// @route   GET /team/getTeam
// @access  Private

const getTeam = asyncHandler(async (req, res) => {
  try {
    const { teams } = await User.findById(req.user._id)
      .populate({
        path: "teams",
        model: "Team",
        populate: {
          path: "members",
          model: "User",
          match: {
            $or: [{ status: "null" }, { status: "paused" }],
          },
          select: [
            "firstName",
            "lastName",
            "email",
            "settings",
            "projects",
            "role",
            "payRate",
          ],
          populate: {
            path: "projects",
            model: "Project",
            select: ["name"],
          },
        },
      })
      .populate({
        path: "teams",
        model: "Team",
        populate: {
          path: "manager",
          model: "User",
          match: {
            $or: [{ status: "null" }, { status: "paused" }],
          },
          select: ["-password", "-settings"],
          populate: { path: "projects", model: "Project" },
        },
      });

    res.json({
      status: "Success",
      data: teams,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete teams
// @route   DELETE /team
// @access  Private

const deleteTeam = asyncHandler(async (req, res) => {
  const manager = req.user;
  const { teamId } = req.body;
  try {
    const team = await Team.findByIdAndRemove(teamId);
    if (!team) throw new Error("No team found");

    const teamMembers = team.members;
    const managerId = team.manager;

    if (!managerId === manager._id) {
      res.status(401);
      throw new Error(
        "You are not a manager assigned to this team. Please contact administrator"
      );
    }

    manager.teams.forEach((team, index) => {
      if (team.equals(team._id)) {
        manager.teams.splice(index, 1);
      }
    });

    await manager.save();

    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].toHexString();
      const employee = await User.findById(id);

      employee.teams.forEach((team, index) => {
        if (team.equals(team._id)) {
          employee.teams.splice(index, 1);
        }
      });
      await employee.save();
    }

    res.status(202).json({
      status: "Deleted Team",
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export {
  createTeam,
  updateMember,
  removeMember,
  getTeamById,
  getTeam,
  deleteTeam,
};
