const Client = require('../models/client');
const mongoose = require('mongoose');

exports.createClient = async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { name } = req.body;
    try {
      const client = new Client({ name });

      await client.save();
      client.manager = employee._id;
      await client.save();
      res.status(201).json({
        messsage: 'Successfully Created Client',
        data: client,
      });
    } catch (error) {
      res.status(500).json({
        messsage: 'Bad Request ',
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: 'UnAuthorized Manager',
    });
  }
};
exports.getClient = async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { name } = req.body;

    try {
      // const id = mongoose.Types.ObjectId(employee._id);
      // // const ID = ObjectId(employee._id);
      // console.log("This is employee id" < employee._id);
      // console.log(id);

      const client = await Client.find({ manager: employee._id });

      if (!client) {
        return res.status(404).json({
          messsage: 'Client not found',
        });
      }

      res.status(201).json({
        messsage: 'Successfully Created Client',
        data: client,
      });
    } catch (error) {
      res.status(500).json({
        messsage: 'Bad Request ',
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: 'UnAuthorized Manager',
    });
  }
};
exports.getClientProjects = async (req, res) => {
  const employee = req.user;

  const { clientId } = req.body;

  const client = await Client.findById(clientId).populate('projects');

  if (!client) {
    return res.status(404).json({
      messsage: 'Client not found',
    });
  }
  res.status(201).json({
    messsage: 'Successfully Created Client',
    data: client,
  });
};

exports.editClient = async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { name } = req.body;

    try {
      // const id = mongoose.Types.ObjectId(employee._id);
      // // const ID = ObjectId(employee._id);
      // console.log("This is employee id" < employee._id);
      // console.log(id);

      const client = await Client.findOneAndUpdate(
        { manager: employee._id },
        req.body
      );

      if (!client) {
        return res.status(404).json({
          messsage: 'Client not found',
        });
      }

      res.status(201).json({
        messsage: 'Successfully Updated Client',
        data: client,
      });
    } catch (error) {
      res.status(500).json({
        messsage: 'Bad Request ',
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: 'UnAuthorized Manager',
    });
  }
};
exports.deleteClient = async (req, res) => {
  const employee = req.user;
  if (employee.role === 'manager') {
    const { name } = req.body;

    try {
      // const id = mongoose.Types.ObjectId(employee._id);
      // // const ID = ObjectId(employee._id);
      // console.log("This is employee id" < employee._id);
      // console.log(id);

      const client = await Client.findOneAndRemove({ manager: employee._id });

      if (!client) {
        return res.status(404).json({
          messsage: 'Client not found',
        });
      }

      res.status(201).json({
        messsage: 'Successfully Deleted Client',
        data: client,
      });
    } catch (error) {
      res.status(500).json({
        messsage: 'Bad Request ',
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: 'UnAuthorized Manager',
    });
  }
};
