import Client from "../models/client.js";
import Project from "../models/project.js";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new project
// @route   POST /project
// @access  Private

const createProject = asyncHandler(async (req, res) => {
  const manager = req.user;
  const { name, clientId } = req.body;
  try {
    const client = await Client.findById(clientId);
    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    const project = new Project({ name });
    if (!project) throw new Error("Error creating new project");

    project.employees.push(manager._id.toHexString());
    project.createdBy = manager._id;

    manager.projects.push(project._id.toHexString());
    await manager.save();

    client.projects.push(project._id.toHexString());
    await client.save();

    project.client = clientId;
    await project.save();

    res.status(201).json({
      status: "Successfully Created Project",
      data: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get user's all projects
// @route   GET /project
// @access  Private

const getProject = asyncHandler(async (req, res) => {
  try {
    const { projects } = await User.findById(req.user._id).populate({
      path: "projects",
      model: "Project",
      populate: {
        path: "employees",
        select: ["firstName", "lastName", "days"],
      },
    });

    res.status(200).json({
      msg: "Success",
      data: projects,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get project by id
// @route   GET /project/:id
// @access  Public

const getProjectById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      res.status(404);
      throw new Error(`No project found ${id}`);
    }
    res.status(200).json({
      status: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Edit project
// @route   PATCH /project
// @access  Private

const editProject = asyncHandler(async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndUpdate(projectId, req.body);
    if (!project) {
      res.status(404);
      throw new Error(`No project found ${projectId}`);
    }

    res.status(200).json({
      status: "Successfully edited project",
      data: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete a project
// @route   DELETE /project
// @access  Private

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error(`No project found ${projectId}`);
    }

    // delete project from client
    const client = await Client.findById(project.client.toHexString());
    if (client) {
      client.projects = client.projects.filter(
        (id) => id.toHexString() !== projectId
      );
    }
    await client.save();

    // delete project from employees array
    if (project.employees.length > 0) {
      for (let i = 0; i < project.employees.length; i++) {
        const emp = await User.findById(project.employees[i]);
        if (emp) {
          emp.projects = emp.projects.filter(
            (id) => id.toHexString() !== projectId
          );
          await emp.save();
        }
      }
    }
    project = await Project.findByIdAndRemove(projectId);

    res.status(202).json({
      status: "Successfully Deleted Project",
      status: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Add employee to project by email
// @route   POST /project/addMember/:id
// @access  Private

const addMember = asyncHandler(async (req, res) => {
  const { employeeMail } = req.body;
  const projectId = req.params.id;
  let alreadyMember = false;
  let alreadyProjectAdded = false;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    const newEmployee = await User.findOne({ email: employeeMail });
    if (!newEmployee) {
      res.status(404);
      throw new Error("No such employee found");
    }
    const employeeId = newEmployee._id;
    project.employees.forEach((employee) => {
      if (employee.equals(employeeId)) {
        alreadyMember = true;
      }
    });

    if (alreadyMember) {
      return res.status(200).json({
        status: "Already A Member",
        data: project,
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
      status: "ok",
      data: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Remove employee from project by id
// @route   PATCH /project/removeMember/:id
// @access  Private

const removeMember = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.body;
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error(`Not found project ${projectId}`);
    }
    const employee = await User.findById(employeeId);
    if (!employee) {
      res.status(404);
      throw new Error(`Not found employee ${employeeId}`);
    }

    if (project.projectLeader?._id.toHexString() === employeeId) {
      project.projectLeader = undefined;
    }

    project.employees = project.employees.filter(
      (id) => id.toHexString() !== employeeId
    );

    employee.projects = employee.projects.filter(
      (id) => id.toHexString() !== projectId
    );

    await employee.save();
    await project.save();
    res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Assign project leader to the given project id
// @route   POST /project/projectLeader/:id
// @access  Private

const assignProjectLeader = asyncHandler(async (req, res) => {
  const { employeeMail } = req.body;
  const projectId = req.params.id;
  let alreadyMember = false;
  let alreadyProjectAdded = false;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404);
      throw new Error(`Not found project ${projectId}`);
    }
    const newEmployee = await User.findOne({ email: employeeMail });
    if (!newEmployee) {
      res.status(404);
      throw new Error(`Not found employee ${employeeMail}`);
    }

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

    res.status(200).json({
      status: "ok",
      data: project,
    });
  } catch (error) {
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
