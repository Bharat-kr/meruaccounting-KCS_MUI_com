import Team from '../models/team.js';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new team
// @route   POST /team/create
// @access  Private

const createTeam = asyncHandler(async (req, res) => {
  const manager = req.user;
  const teamName = req.body.name;
  if (!manager.isManager) {
    res.status(401);
    throw new Error('Unauthorized Access');
  }
  try {
    const team = new Team({ teamName });
    await team.save();
    team.manager = manager._id;
    manager.teams.push(team._id.toHexString());
    await manager.save();
    await team.save();
    res.status(201).json({
      status: 'New team created',
      data: team,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Add a member to a team
// @route   POST /team/add/:id
// @access  Private

const addMember = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const employee = req.user;
  if (manager.isManager) {
    try {
      await team.save();
      team.employees.push(id);
      await team.save();

      res.json({
        status: 'Ok',
        data: team,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized');
  }
});

// @desc    Update member
// @route   PATCH /team/updateMember
// @access  Private

const updateMember = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (!manager.isManager) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  const settings = manager.settings;

  const employeeMail = req.body.employeeMail;
  const teamId = req.body.teamId;
  let alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    const newEmployee = await User.findOne({ email: employeeMail });
    const employeeId = newEmployee._id;
    team.employees.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });
    if (alreadyMember) {
      return res.json({
        status: 'Ok',
        data: 'Already A Member',
      });
    }
    const employee = await User.findById(employeeId);
    employee.settings = settings;
    employee.save();
    team.employees.push(employeeId);
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

// TODO: why is it public? add authentication
// @desc    Remove member
// @route   DELETE /team/updateMember
// @access  Public

const removeMember = asyncHandler(async (req, res) => {
  const employeeId = req.body.employeeId;
  const teamId = req.body.teamId;
  let alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    team.employees.forEach((employee, index) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
        team.employees.splice(index, 1);
      }
    });
    if (alreadyMember == false) {
      return res.json({
        status: 'Ok',
        data: 'No Member Found',
      });
    }
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

// @desc    Get teams per id
// @route   GET /team/getTeam/:id
// @access  Private

const getTeamById = asyncHandler(async (req, res) => {
  const user = req.user;
  const teamId = req.params.id;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  const team = await Team.findById(teamId);
  if (!team) {
    res.status(404);
    throw new Error('No teams found');
  }
  const TeamMembers = await Team.populate(team, {
    path: 'employees',
  });
  let teamMember = [];
  for (let i = 0; i < TeamMembers.employees.length; i++) {
    const emp = TeamMembers.employees[i];
    const member = await User.populate(emp, {
      path: 'projects',
    });
    teamMember.push(member);
  }

  const TeamProject = await Team.populate(team, {
    path: 'projects',
  });
  const teamProject = TeamProject.projects;

  res.json({
    msg: 'Success',
    data: {
      team,
      teamMember,
      teamProject,
    },
  });
});

// @desc    Get teams
// @route   GET /team/getTeam
// @access  Private

const getTeam = asyncHandler(async (req, res) => {
  const responseArray = [];
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  for (let i = 0; i < user.teams.length; i++) {
    const team = await Team.findById(user.teams[i]);
    if (team) {
      await Team.populate(team, {
        path: 'employees',
      });
      await Team.populate(team, {
        path: 'projects',
      });
      responseArray.push(team);
    } else {
      continue;
    }
  }
  res.json({
    msg: 'Success',
    data: responseArray,
  });
});

// @desc    Get teams
// @route   DELETE /team
// @access  Private

const deleteTeam = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (!manager.isManager) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  const teamId = req.body.teamId;
  try {
    const team = await Team.findByIdAndRemove(teamId);

    const teamMembers = team.employees;
    const managerId = team.manager;
    if (!managerId === manager._id) {
      throw new Error('You Can Only Delete Your Teams');
    }
    manager.team.forEach((team, index) => {
      if (team.equals(team._id)) {
        manager.team.splice(index, 1);
      }
    });
    await manager.save();

    for (let i = 0; i < teamMembers.length; i++) {
      const id = teamMembers[i].toHexString();
      const employee = await User.findById(id);

      console.log(employee);

      employee.team.forEach((team, index) => {
        console.log(team);

        if (team.equals(team._id)) {
          employee.team.splice(index, 1);
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
  addMember,
  updateMember,
  removeMember,
  getTeamById,
  getTeam,
  deleteTeam,
};
