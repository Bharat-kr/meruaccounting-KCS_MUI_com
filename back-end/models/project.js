const mongoose = require("mongoose");
const User = require("./user");
const Team = require("./team");
const Client = require("./client");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Client,
  },

  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Team,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
