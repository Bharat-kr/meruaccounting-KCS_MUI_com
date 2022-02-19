import mongoose from "mongoose";

const reportsSchema = new mongoose.Schema(
  {
    includeSS: { type: Boolean, default: false },
    includeAL: { type: Boolean, default: false },
    includePR: { type: Boolean, default: false },
    includeApps: { type: Boolean, default: false },
    name: { type: String, unique: "true" },
    fileName: { type: String, unique: "true" },
    groupBy: { type: String, unique: "true" },
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", reportsSchema);

export default Reports;
