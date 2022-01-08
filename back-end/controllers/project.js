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
      project.employees.push(manager._id.toHexString());
      project.createdBy = manager._id;
      const client = await Client.findById(clientId);
      if (!client) throw new Error('Client not found');

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

// @desc    Get user's all projects
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
    const project = await Project.findById(user.projects[i]).populate(
      'employees'
    );
    if (project) {
      // project = await Project.populate({
      //   path: 'project',
      //   populate: {
      //     path: 'employees',
      //     model: 'User',
      //   },
      // });

      // for (let j = 0; j < project.employees.length; j++) {
      //   const employee = await User.findById(project.employees[j]);
      //   console.log(employee);

      //   project.employees[j] = employee;
      //   console.log(project.employees[j]);
      // }

      // console.log(project.employees);

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
      // delete project itself
      const project = await Project.findByIdAndRemove(projectId);
      // const project = await Project.findById(projectId);
      if (!project) {
        res.status(404);
        throw new Error(`No project found ${projectId}`);
      }

      // delete project from client
      {
        const client = await Client.findById(project.client.toHexString());
        if (!client) {
          throw new Error('Client not found');
        }
        client.projects = client.projects.filter(
          (id) => id.toHexString() !== projectId
        );
        await client.save();
      }

      // delete project from employees array
      if (project.employees.length === 0) {
        throw new Error('No employee in projects');
      }
      // project.createdBy;
      for (let i = 0; i < project.employees.length; i++) {
        const emp = await User.findById(project.employees[i]);
        if (!emp) throw new Error(`Employee ${project.employees[i]} not found`);
        emp.projects = emp.projects.filter(
          (id) => id.toHexString() !== projectId
        );
        await emp.save();
      }
      await employee.save();

      res.status(202).json({
        messsage: 'Successfully Deleted Project',
        status: 'success',
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

// @desc    Add employee to project by email
// @route   POST /project/addMember/:id
// @access  Private

const addMember = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (manager.role !== 'manager') {
    throw new Error('Unauthorized');
  }

  const employeeMail = req.body.employeeMail;
  const projectId = req.params.id;
  let alreadyMember = false;
  let alreadyProjectAdded = false;
  try {
    const project = await Project.findById(projectId);
    const newEmployee = await User.findOne({ email: employeeMail });
    const employeeId = newEmployee._id;
    project.employees.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });

    if (alreadyMember) {
      return res.json({
        status: 'Ok',
        message: 'Already A Member',
      });
    }

    newEmployee.projects.forEach((id) => {
      if (id.equals(project._id)) {
        alreadyProjectAdded = true;
      }
    });
    if (!alreadyProjectAdded) {
      newEmployee.projects.push(projectId);
      await newEmployee.save();
    }

    project.employees.push(employeeId);
    await project.save();
    res.status(201).json({
      status: 'ok',
      data: project,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Remove employee from project by id
// @route   PATCH /project/removeMember/:id
// @access  Private

const removeMember = asyncHandler(async (req, res) => {
  try {
    const manager = req.user;
    if (manager.role !== 'manager') {
      throw new Error('Unauthorized');
    }
    const employeeId = req.body.employeeId;
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    const employee = await User.findById(employeeId);

    if (project.projectLeader?._id.toHexString() === employeeId) {
      project.projectLeader = null;
    }

    project.employees = project.employees.filter(
      (id) => id.toHexString() !== employeeId
    );

    employee.projects = employee.projects.filter(
      (id) => id.toHexString() !== projectId
    );

    await employee.save();
    await project.save();
    res.json({
      status: 'success',
      data: project,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Assign project leader to the given id
// @route   POST /project/projectLeader/:id
// @access  Private

const assignProjectLeader = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (manager.role !== 'manager') {
    throw new Error('Unauthorized');
  }
  const employeeMail = req.body.employeeMail;
  const projectId = req.params.id;
  let alreadyMember = false;
  let alreadyProjectAdded = false;
  try {
    const project = await Project.findById(projectId);
    const newEmployee = await User.findOne({ email: employeeMail });
    const employeeId = newEmployee._id;
    project.employees.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });
    if (!alreadyMember) {
      project.employees.push(employeeId);
    }

    newEmployee.projects.forEach((id) => {
      if (id.equals(project._id)) {
        alreadyProjectAdded = true;
      }
    });
    if (!alreadyProjectAdded) {
      newEmployee.projects.push(projectId);
      await newEmployee.save();
    }

    project.projectLeader = employeeId;
    await newEmployee.save();
    await project.save();
    res.json({
      status: 'ok',
      data: project,
      newEmployee,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export {
  createProject,
  deleteProject,
  editProject,
  getProjectById,
  getProject,
  addMember,
  assignProjectLeader,
  removeMember,
};

// // @desc    Add team to project
// // @route   PATCH /project
// // @access  Private
// //
// const projectTeam = asyncHandler(async (req, res) => {
//   const employee = req.user;
//   if (employee.role === 'manager') {
//     const { teamId, projectId } = req.body;
//     try {
//       const project = await Project.findById(projectId);
//       if (!project) {
//         res.status(404);
//         throw new Error(`No project found ${projectId}`);
//       }

//       const team = await Team.findById(teamId).populate('employees');
//       if (!team) {
//         res.status(404);
//         throw new Error(`No team found ${teamId}`);
//       }

//       for (let i = 0; i < team.employees.length; i++) {
//         let emp = team.employees[i];

//         emp.projects.push(projectId);
//         await emp.save();
//       }

//       project.team.push(teamId);
//       team.projects.push(projectId);
//       await project.save();
//       await team.save();
//       res.status(201).json({
//         messsage: 'Successfully Added team to  Project',
//         data: project,
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error(error);
//     }
//   } else {
//     res.status(401);
//     throw new Error('Unauthorized manager');
//   }
// });
