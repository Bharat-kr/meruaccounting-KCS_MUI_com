import Client from '../models/client.js';
import Project from '../models/project.js';
import Team from '../models/team.js';

// @desc    Create a new project
// @route   POST /project
// @access  Private

const createProject = async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { name, clientId } = req.body;
    try {
      const project = new Project({ name });
      const client = await Client.findById(clientId);

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
};

// @desc    Get project by id
// @route   GET /project/:id
// @access  Private

const getProject = async (req, res) => {
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
};

// @desc    Edit project
// @route   PATCH /project
// @access  Private

const editProject = async (req, res) => {
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
};

// @desc    Delete a project
// @route   DELETE /project
// @access  Private

const deleteProject = async (req, res) => {
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
};

// @desc    Add team to project
// @route   PATCH /project
// @access  Private

const projectTeam = async (req, res) => {
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
};

export { createProject, deleteProject, editProject, getProject, projectTeam };
