import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String },
  teamLeader: {
    type: String,
  },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

teamSchema.methods.setManagerInTeam = async function (managerId) {
  const team = this;
  team.manager = managerId;
  await team.save();
};
teamSchema.methods.addEmployees = async function (employeeId) {
  const team = this;

  team.employees.push(employeeId);
  await team.save();
};
const Team = mongoose.model("Team", teamSchema);

export default Team;
