const mongoose = require("mongoose");
const User = require("./user");
const Project = require("../models/project");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
