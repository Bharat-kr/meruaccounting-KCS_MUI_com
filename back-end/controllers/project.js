import Client from '../models/client.js';
import Project from '../models/project.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new project
// @route   POST /project
// @access  Private

const createProject = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (manager.role === 'manager') {
    const { name, clientId } = req.body;
    try {
      const project = new Project({ name });
      const client = await Client.findById(clientId);

      manager.projects.push(project._id.toHexString());
      await manager.save();

      await project.save();
      client.projects.push(project._id.toHexString());
      await client.save();
      project.client = clientId;
      await project.save();
      res.status(201).json({
        messsage: 'Successfully Created Project',
        data: project,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized manager');
  }
});

//TODO: not working
// @desc    Get project
// @route   GET /project
// @access  Public

const getProject = asyncHandler(async (req, res) => { 
  const responseArray = [];
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  for (let i = 0; i < user.projects.length; i++) {
    const project = await Project.findById(user.projects[i]);
    if (project) {
      await Project.populate(project, {
        path: 'members',
      });
      responseArray.push(project);
    } else {
      continue;
    }
  }
  res.json({
    msg: 'Success',
    data: responseArray,
  });
});

// @desc    Get project by id
// @route   GET /project/:id
// @access  Private

const getProjectById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404);
      throw new Error('No projects found');
    }
    res.status(200).json({
      project,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Edit project
// @route   PATCH /project
// @access  Private

const editProject = asyncHandler(async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const projectId = req.params.id;

    try {
      const project = await Project.findByIdAndUpdate(projectId, req.body);
      if (!project) {
        res.status(404);
        throw new Error(`No project found ${projectId}`);
      }

      res.status(202).json({
        messsage: 'Successfully edited project',
        data: project,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized manager');
  }
});

// @desc    Delete a project
// @route   DELETE /project
// @access  Private

const deleteProject = asyncHandler(async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { projectId } = req.body;
    try {
      const project = await Project.findByIdAndRemove(projectId);
      if (!project) {
        res.status(404);
        throw new Error(`No project found ${projectId}`);
      }

      res.status(202).json({
        messsage: 'Successfully Deleted Project',
        data: project,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized manager');
  }
});

// @desc    Add team to project
// @route   PATCH /project
// @access  Private

const projectTeam = asyncHandler(async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { teamId, projectId } = req.body;
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error(`No project found ${projectId}`);
      }

      const team = await Team.findById(teamId).populate('employees');
      if (!team) {
        res.status(404);
        throw new Error(`No team found ${teamId}`);
      }

      for (let i = 0; i < team.employees.length; i++) {
        let emp = team.employees[i];

        emp.projects.push(projectId);
        await emp.save();
      }

      project.team.push(teamId);
      team.projects.push(projectId);
      await project.save();
      await team.save();
      res.status(201).json({
        messsage: 'Successfully Added team to  Project',
        data: project,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized manager');
  }
});

export {
  createProject,
  deleteProject,
  editProject,
  getProjectById,
  getProject,
  projectTeam,
};
