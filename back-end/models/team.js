const mongoose = require("mongoose");
const User = require("./user");
const Project = require("../models/project");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
