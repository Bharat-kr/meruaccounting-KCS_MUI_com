import mongoose from "mongoose";

const screenshotSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "curUserId",
    required: true,
  },
  consumeTime: {
    type: Number,
    default: 0.0,
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
  image: {
    type: String,
    default: "",
  },
  activityAt: {
    type: String,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activityId",
    required: true,
  },
  performanceData: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "Default title",
  },
});

const Screenshot = mongoose.model("Screenshot", screenshotSchema);

export default Screenshot;
