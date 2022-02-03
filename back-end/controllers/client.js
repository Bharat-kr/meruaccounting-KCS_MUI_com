import Client from "../models/client.js";
import Project from "../models/project.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { AccessControl } from "accesscontrol";
import { grantsObject } from "../utils/permissions.js";

const ac = new AccessControl(grantsObject);

/* -------------------------------------------------------------------------- */

// @desc    Create a new client
// @route   POST /client
// @access  Private

const createClient = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).createOwn("client");
  if (permission.granted) {
    try {
      const { name } = req.body;
      const manager = req.user;
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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Get client
// @route   GET /client/getClient
// @access  Private

const getClient = asyncHandler(async (req, res) => {
  console.log(ac);
  const permission = ac.can(req.user.role).readOwn("client", ["*"]);
  console.log(permission);
  if (permission.granted) {
    try {
      const client = await Client.find({ manager: req.user._id }).populate([
        {
          path: "projects",
          populate: [
            {
              path: "employees",
              select: ["firstName", "lastName", "days", "email", "projects"],
              populate: {
                path: "projects",
                model: "Project",
                select: ["name", "budgetTime"],
              },
            },
            {
              path: "projectLeader",
              select: ["firstName", "lastName", "email"],
            },
            { path: "createdBy", select: ["firstName", "lastName"] },
          ],
        },
        { path: "createdBy", select: ["firstName", "lastName"] },
      ]);

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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
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
  const permission = ac.can(req.user.role).updateAny("client");
  if (permission.granted) {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, req.body);

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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

// @desc    Delete client
// @route   DELETE /client/:id
// @access  Private

const deleteClient = asyncHandler(async (req, res) => {
  const permission = ac.can(req.user.role).deleteOwn("client");
  if (permission.granted) {
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
              if (project.toHexString() === projectId.toHexString()) {
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
  } else {
    // resource is forbidden for this user/role
    res.status(403).end("UnAuthorized");
  }
});

export { createClient, deleteClient, editClient, getClient, getClientById };
