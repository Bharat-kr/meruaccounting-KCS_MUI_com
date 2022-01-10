import Client from "../models/client.js";
import Project from "../models/project.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new client
// @route   POST /client
// @access  Private

const createClient = asyncHandler(async (req, res) => {
  const manager = req.user;
  if (manager.role === "manager") {
    const { name } = req.body;
    try {
      const client = new Client({ name });
      client.createdBy = manager._id;
      await client.save();

      manager.clients.push(client);
      await manager.save();

      res.status(201).json({
        messsage: "Successfully Created Client",
        data: client,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

// @desc    Get client
// @route   GET /client/getClient
// @access  Private

const getClient = asyncHandler(async (req, res) => {
  const employee = req.user;
  let responseArray = [];
  if (employee.role === "manager") {
    try {
      const client = await Client.find({ manager: employee._id })
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
            select: ["firstName", "lastName", "days", "email"],
          },
        });

      // for (let j = 0; j < client.projects.length; j++) {
      //   await Project.populate(client.projects[i], {
      //     path: 'members',
      //   });
      // }

      if (!client) {
        res.status(404);
        throw new Error("No clients found");
      }

      responseArray.push(client);

      // for (let j = 0; j < responseArray.length; j++) {
      //   console.log(responseArray[j]);
      // }

      res.status(200).json({
        messsage: "Client fetched succesfully",
        data: responseArray[0],
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

// @desc    Get client by id
// @route   GET /client/:id
// @access  Private

const getClientProjects = asyncHandler(async (req, res) => {
  const { clientId } = req.body;
  const client = await Client.findById(clientId).populate("projects");
  try {
    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }
    res.status(201).json({
      messsage: "Client Projects",
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
  const employee = req.user;
  if (employee.role === "manager") {
    try {
      const client = await Client.findOneAndUpdate(
        { manager: employee._id },
        req.body
      );

      if (!client) {
        res.status(404);
        throw new Error("Client not found");
      }

      res.status(201).json({
        messsage: "Successfully Updated Client",
        data: client,
      });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

// @desc    Delete client
// @route   DELETE /client/:id
// @access  Private

const deleteClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;

  if (employee.role === "manager") {
    try {
      const client = await Client.findByIdAndRemove(clientId);

      if (!client) {
        res.status(404);
        throw new Error("Client not found");
      }

      res.status(201).json({
        messsage: "Successfully Deleted Client",
        data: client,
      });
    } catch (error) {
      console.log("hey");
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

export { createClient, deleteClient, editClient, getClient, getClientById };
