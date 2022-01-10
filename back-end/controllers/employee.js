import User from '../models/user.js';
import Client from '../models/client.js';
import Project from '../models/project.js';
import Team from '../models/team.js';
import asyncHandler from 'express-async-handler';

// @desc    Get employee details by ID
// @route   GET /employee/:id
// @access  Private

const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await User.findById(id);
    if (!employee) {
      res.status(404);
      throw new Error(`Employee not found `);
    }
    res.status(200).json({
      status: 'Ok',
      data: employee,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get employee details
// @route   GET /employee/employeeList
// @access  Private

const getEmployeeList = asyncHandler(async (req, res) => {
  try {
    const { teams } = await User.findById(req.user._id).populate({
      path: 'teams',
      model: 'Team',
      populate: {
        path: 'members',
        model: 'User',
        select: ['firstName', 'lastName', 'email'],
      },
    });

    res.status(200).json({
      messsage: 'Success',
      data: teams,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete a employee
// @route   DELETE /employee/:id
// @access  Private

const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    /* ---------------------------- finding employee ---------------------------- */

    const employee = await User.findById(id);

    if (employee) {
      res.status(404);
      throw new Error('Employee to be deleted not found');
    }

    /* ------ finding employee clients and removing createdBy field ----- */

    for (let i = 0; i < employee.clients.length; i++) {
      const clientId = employee.clients[i];
      const client = await Client.findById(clientId);
      client.createdBy = undefined;
      await client.save();
    }

    /* ------ removing project reference field of employee that is deleted ------ */
    for (let i = 0; i < employee.projects.length; i++) {
      const projectId = employee.projects[i];
      const project = await Project.findById(projectId);

      project.employees.forEach((employee, index) => {
        if (employee.toHexString() == id.toHexString()) {
          project.employees.splice(index, 1);
        }
      });
      if (project.projectLeader.toHexString() == id.toHexString()) {
        project.projectLeader = undefined;
      }
      if (project.createdBy.toHexString() == id.toHexString()) {
        project.createdBy = undefined;
      }
      await project.save();
    }

    /* ------ removing team reference field of employee that is deleted ------ */
    for (let i = 0; i < employee.teams.length; i++) {
      const teamId = employee.teams[i];
      const team = await Team.findById(teamId);

      team.members.forEach((employee, index) => {
        if (employee.toHexString() == id.toHexString()) {
          team.members.splice(index, 1);
        }
      });

      await team.save();
    }
    await User.findByIdAndRemove(id);

    res.json({
      status: 'Employee Deleted',
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
      message: 'User Updated',
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { getEmployeeList, getEmployeeById, deleteEmployee, editEmployee };
