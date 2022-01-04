import mongoose from 'mongoose';

const screenshotSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curUserId',
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curClientId',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curProjectId',
  },
  // this is a taskId
  task: {
    type: String,
    default: '',
  },
  //TODO: not found image in default
  image: {
    type: String,
    default: '',
  },
  activityAt: {
    type: String,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activityId',
  },
  performanceData: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: 'Default title',
  },
});

const Screenshot = mongoose.model('Screenshot', screenshotSchema);

export default Screenshot;
