import Team from '../models/team.js';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new team
// @route   POST /team/create
// @access  Private

const createTeam = asyncHandler(async (req, res) => {
  const manager = req.user;
  const teamName = req.body.name;

  try {
    const team = await Team.create({ name: teamName });
    team.members.push(manager._id);
    team.manager = manager._id;
    await team.save();
    manager.teams.push(team._id.toHexString());

    await manager.save();

    res.status(201).json({
      status: 'New team created',
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
  const manager = req.user;

  const { employeeMail, teamId } = req.body;
  let alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    const newEmployee = await User.findOne({ email: employeeMail });
    const employeeId = newEmployee._id;
    team.members.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });
    if (alreadyMember) {
      return res.json({
        status: 'Already A Member',
        data: team,
      });
    }

    team.members.push(employeeId);
    await team.save();

    res.json({
      status: 'Ok',
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Remove member
// @route   DELETE /team/updateMember
// @access  Public

const removeMember = asyncHandler(async (req, res) => {
  const { employeeId, teamId } = req.body;
  let alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    if (!team) throw new Error('Invalid teamId');

    const employee = await User.findById(employeeId);
    if (!employee) throw new Error('Invalid user id');

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
      return res.json({
        status: 'No Member Found',
        data: team,
      });
    }
    await team.save();
    await employee.save();
    res.json({
      status: 'Ok',
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
  const teamId = req.params.id;

  const team = await Team.findById(teamId).populate({
    path: 'members',
    model: 'User',
    select: ['fistName', 'lastName', 'email'],
  });
  if (!team) {
    res.status(404);
    throw new Error('No teams found');
  }

  res.json({
    msg: 'Success',
    data: team,
  });
});

// @desc    Get all teams of user
// @route   GET /team/getTeam
// @access  Private

const getTeam = asyncHandler(async (req, res) => {
  try {
    const { teams } = await User.findById(req.user._id)
      .populate({
        path: 'teams',
        model: 'Team',
        populate: {
          path: 'members',
          model: 'User',
          select: ['fistName', 'lastName', 'email'],
        },
      })
      .populate({
        path: 'teams',
        model: 'Team',
        populate: {
          path: 'manager',
          model: 'User',
          select: ['fistName', 'lastName', 'email'],
        },
      });

    res.json({
      msg: 'Success',
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
    if (!team) throw new Error('No team found');

    const teamMembers = team.members;
    const managerId = team.manager;

    if (!managerId === manager._id) {
      throw new Error(
        'You are not a manager assigned to this team. Please contact administrator'
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

    res.json({
      status: 'Deleted Team',
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
