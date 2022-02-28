import mongoose from "mongoose";

const reportsSchema = new mongoose.Schema(
  {
    includeSS: { type: Boolean, default: false },
    includeAL: { type: Boolean, default: false },
    includePR: { type: Boolean, default: false },
    includeApps: { type: Boolean, default: false },
    // dateRange: [{ type: String }],
    // employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
    // projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    name: { type: String, default: "no name" },
    fileName: { type: String, unique: "true" },
    // groupBy: { type: String },
    url: { type: String, unique: "true" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    options: { type: mongoose.SchemaTypes.Mixed },
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", reportsSchema);

export default Reports;
