import mongoose from "mongoose";

const reportsSchema = new mongoose.Schema(
  {
    includeSS: { type: Boolean, default: false },
    includeAL: { type: Boolean, default: false },
    includePR: { type: Boolean, default: false },
    includeApps: { type: Boolean, default: false },
    name: { type: String },
    fileName: { type: String, unique: "true" },
    groupBy: { type: String },
    url: { type: String, unique: "true" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    options: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", reportsSchema);

export default Reports;
