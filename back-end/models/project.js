import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String },
    budgetedHours: { type: Number },

    projectLeader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    consumeTime: String,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
