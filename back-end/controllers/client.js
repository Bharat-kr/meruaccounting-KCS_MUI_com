import Client from "../models/client.js";
import Project from "../models/project.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc    Create a new client
// @route   POST /client
// @access  Private

const createClient = asyncHandler(async (req, res) => {
  const manager = req.user;
  const { name } = req.body;
  try {
    const client = new Client({ name });

    if (!client) throw new Error("Error creating a new client");

    client.createdBy = manager._id;
    await client.save();

    manager.clients.push(client);
    await manager.save();

    res.status(201).json({
      status: "Successfully Created Client",
      data: client,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get client
// @route   GET /client/getClient
// @access  Private

const getClient = asyncHandler(async (req, res) => {
  try {
    const client = await Client.find({ manager: req.user._id })
      .populate({
        path: "projects",
        populate: {
          path: "projectLeader",
          select: ["firstName", "lastName", "email"],
        },
      })
      .populate({
        path: "projects",
        populate: {
          path: "employees",
          match: {
            $or: [{ status: "null" }, { status: "paused" }],
          },
          select: ["firstName", "lastName", "days", "email", "projects"],
          populate: {
            path: "projects",
            model: "Project",
            select: ["name", "budgetTime"],
          },
        },
      });

    if (!client) {
      res.status(404);
      throw new Error("No clients found");
    }

    res.status(200).json({
      status: "Client fetched succesfully",
      data: client,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get client by id
// @route   GET /client/:id
// @access  Private

const getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id).populate("projects");
  try {
    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }
    res.status(200).json({
      status: "Client fetched succesfully",
      data: client,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Edit client
// @route   PATCH /client/:id
// @access  Private

const editClient = asyncHandler(async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(req.params.id, req.body);

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    res.status(200).json({
      status: "Successfully Updated Client",
      data: client,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Delete client
// @route   DELETE /client/:id
// @access  Private

const deleteClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;

  try {
    /* ---------------------------- // finding Client ---------------------------- */
    const client = await Client.findById(clientId);

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    const userId = client.createdBy;

    /* ------------------ finding user to delete client in that ----------------- */

    const user = await User.findById(userId);
    if (user) {
      user.clients.forEach((client, index) => {
        if (client.toHexString() == clientId) {
          user.clients.splice(index, 1);
        }
      });
      await user.save();
    }

    /* ------------------------ deleting projects in user ------------------------ */
    // taking projects from deleting client and deleting the projects and project field from their respective members

    for (let i = 0; i < client.projects.length; i++) {
      const projectId = client.projects[i];
      const project = await Project.findById(projectId);

      for (let j = 0; j < project.employees.length; j++) {
        // Deleting projects reference from the emoployee
        const employeeId = project.employees[j];
        const employee = await User.findById(employeeId);

        if (employee) {
          employee.projects.forEach((project, index) => {
            if (project.toHexString() == projectId.toHexString()) {
              employee.projects.splice(index, 1);
            }
          });
          await employee.save();
        }
      }
      // Deleting Project
      await Project.findByIdAndRemove(projectId);
    }

    /* --------------------------- deleting the client -------------------------- */

    await Client.findByIdAndRemove(clientId);

    /* ---------------------------- Sending response ---------------------------- */

    res.status(202).json({
      status: "Successfully Deleted Client",
      data: client,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { createClient, deleteClient, editClient, getClient, getClientById };
