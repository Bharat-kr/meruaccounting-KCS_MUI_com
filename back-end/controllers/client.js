import Client from "../models/client.js";
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
      await client.save();

      manager.clients.push(client);
      await manager.save();

      res.status(201).json({
        messsage: "Successfully Created Client",
        data: { manager },
      });
    } catch (error) {
      res.status(500);
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
  if (employee.role === "manager") {
    try {
      const client = await Client.find({ manager: employee._id }).populate(
        "projects"
      );

      if (!client) {
        res.status(404);
        throw new Error("No clients found");
      }

      res.status(200).json({
        messsage: "Client fetched succesfully",
        data: client,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

// @desc    Get client projects
// @route   GET /client/getClientProjects
// @access  Private

const getClientProjects = asyncHandler(async (req, res) => {
  console.log("hey");
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
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Edit client
// @route   PATCH /client
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
      res.status(500);
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

// @desc    Delete client
// @route   DELETE /client
// @access  Private

const deleteClient = asyncHandler(async (req, res) => {
  const employee = req.user;
  const clientId = req.body.clientId;
  console.log(req.user);
  if (employee.role === "manager") {
    try {
      const client = await Client.findByIdAndRemove(clientId);
      console.log(client);
      if (!client) {
        res.status(404);
        throw new Error("Client not found");
      }

      res.status(201).json({
        messsage: "Successfully Deleted Client",
        data: client,
      });
    } catch (error) {
      res.status(500);
      console.log("hey");
      throw new Error(error);
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized manager");
  }
});

export { createClient, deleteClient, editClient, getClient, getClientProjects };
