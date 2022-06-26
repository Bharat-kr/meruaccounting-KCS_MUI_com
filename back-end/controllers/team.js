import Team from "../models/team.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";

const ac = new AccessControl(grantsObject);

// @desc    Create a new team
// @route   POST /team/create
// @access  Private

const createTeam = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).createOwn("team");
  if (permission.granted) {
    try {
      const manager = req.user;
      const teamName = req.body.name;
      const uniqueTeam = await Team.findOne({ name: teamName });
      if (uniqueTeam) {
        throw new Error("Team already exists.");
      }

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
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Add member to team
// @route   PATCH /team/updateMember
// @access  Private
// @params  { teamId: " " , employeeMail: " "}

const updateMember = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).updateOwn("team");
  if (permission.granted) {
    try {
      const { employeeId, teamId } = req.body;
      let alreadyMember = false;

      const team = await Team.findById(teamId);
      if (!team) {
        res.status(404);
        throw new Error(`No team found ${teamId}`);
      }

      const newEmployee = await User.findById(employeeId);
      if (!newEmployee) {
        res.status(404);
        throw new Error(`No employee found with Id ${employeeId}`);
      }

      // const employeeId = newEmployee._id;
      team.members.forEach((employee) => {
        if (employee.equals(employeeId)) {
          alreadyMember = true;
        }
      });
      if (alreadyMember) {
        res.status(200);
        throw new Error(`Already a member`);
      }

      team.members.push(employeeId);
      await team.save();

      //adding notiifcation for employee
      const notification = {
        title: "New Team",
        description: `Added to the team ${team.name}`,
        avatar: "if there is some avatar",
        type: "teams",
      };
      newEmployee.notifications = [notification, ...newEmployee.notifications];

      await newEmployee.save();

      res.status(200).json({
        status: "ok",
        data: team,
      });
    } catch (error) {
      if (!res.status) {
        res.status(500);
      }
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Update manager of team
// @route   PATCH /team/updateTeam
// @access  Private
// @params  { teamId:" " ,newManager: " " }

const updateTeam = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).updateOwn("team");
  if (permission.granted) {
    try {
      const { teamId, newManager } = req.body;

      const team = await Team.findById(teamId);
      if (!team) {
        res.status(404);
        throw new Error(`No team found ${teamId}`);
      }
      team.manager = newManager;
      await team.save();

      res.status(200).json({
        status: "ok",
        data: team,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Remove member
// @route   DELETE /team/updateMember
// @access  Private

const removeMember = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).deleteOwn("team");
  if (permission.granted) {
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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Get teams per id
// @route   GET /team/getTeam/:id
// @access  Private

const getTeamById = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      const teamId = req.params.id;
      const team = await Team.findById(teamId).populate({
        path: "members",
        model: "User",
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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Get all teams of user
// @route   GET /team/getTeam
// @access  Private

const getTeam = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      const user = await User.findById(req.user._id);
      let dteams;
      if (user.role === "admin") {
        dteams = await Team.find()
          .populate({
            path: "members",
            model: "User",
            select: [
              "firstName",
              "lastName",
              "email",
              "settings",
              "projects",
              "role",
              "payRate",
              "status",
            ],
            populate: {
              path: "projects",
              model: "Project",
              select: ["name", "projectLeader"],
            },
          })
          .populate({
            path: "manager",
            model: "User",
            select: ["-password", "-settings"],
            populate: { path: "projects", model: "Project" },
          });
      } else {
        const { teams } = await User.findById(req.user._id)
          .populate({
            path: "teams",
            model: "Team",
            populate: {
              path: "members",
              model: "User",
              select: [
                "firstName",
                "lastName",
                "email",
                "settings",
                "projects",
                "role",
                "payRate",
                "status",
              ],
              populate: {
                path: "projects",
                model: "Project",
                select: ["name", "projectLeader"],
              },
            },
          })
          .populate({
            path: "teams",
            model: "Team",
            populate: {
              path: "manager",
              model: "User",
              select: ["-password", "-settings"],
              populate: { path: "projects", model: "Project" },
            },
          });

        dteams = teams;
      }

      res.json({
        status: "Success",
        data: dteams,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Delete teams
// @route   DELETE /team
// @access  Private

const deleteTeam = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    const manager = req.user;
    const teamId = req.params.id;
    try {
      // console.log(req.body);
      const team = await Team.findByIdAndDelete(teamId);
      if (!team) throw new Error("No team found", teamId);

      const teamMembers = team.members;
      const managerId = team.manager;

      if (!managerId === manager._id.toHexString()) {
        res.status(401);
        throw new Error(
          "You are not a manager assigned to this team. Please contact administrator"
        );
      }

      manager.teams.filter((team) => {
        return team !== teamId;
      });

      await manager.save();

      for (let i = 0; i < teamMembers.length; i++) {
        const id = teamMembers[i].toHexString();
        const employee = await User.findById(id);

        employee.teams.filter((team) => {
          return team !== teamId;
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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

const getTeamMemberData = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).readOwn("team");
  if (permission.granted) {
    try {
      let teamsArr = [];
      const { teams } = await User.findById(req.user._id).populate({
        path: "teams",
        model: "Team",
        populate: {
          path: "members",
          model: "User",
          select: [
            "_id",
            // , "firstName", " lastName", "payRate", "lastActive"
          ],
        },
      });
      // teams?.map((team) => {
      //   team?.members?.map((m) => {
      //     console.log(m);
      //     teamsArr(m._id);
      //   });
      // });
      // let uniqueTeamsArr = [...new Set(teamsArr)];

      // console.log(teamsArr);
      res.status(200).json({
        message: "OK",
        data: teams,
      });
    } catch (err) {
      throw new Error(error);
    }
  }
});

export {
  createTeam,
  updateMember,
  removeMember,
  getTeamById,
  getTeam,
  deleteTeam,
  getTeamMemberData,
  updateTeam,
};
