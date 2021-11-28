const Client = require("../models/client");

exports.createClient = async (req, res) => {
  const employee = req.user;
  if (employee.role === "manager") {
    const { name } = req.body;
    try {
      const client = new Client({ name });

      await client.save();
      client.manager = employee._id;
      await client.save();
      res.status(201).json({
        messsage: "Successfully Created Client",
        data: client,
      });
    } catch (error) {
      res.status(500).json({
        messsage: "Bad Request ",
        data: error,
      });
    }
  } else {
    res.status(201).json({
      messsage: "UnAuthorized Manager",
    });
  }
};

exports.g;
