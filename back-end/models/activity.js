import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  hoursWorked: {
    projectHours: { type: Number, default: 0.0 },
    internalHours: { type: Number, default: 0.0 },
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curClientId',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "curClientId",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "curProjectId",
    required: true,
  },
  task: {
    type: String,
    default: "",
  },
  startTime: {
    type: String,
    default: "",
  },
  endTime: {
    type: String,
    default: "",
  },
  consumeTime: {
    type: Number,
    default: 0.0,
  },
  isAccepted: {
    type: Boolean,
    default: true,
  },
  isInternal: { type: Boolean, default: false },
  performanceData: { type: Number, default: 0 },
  screenshots: [{ type: mongoose.Types.ObjectId, ref: "Screenshot" }],
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
