import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  hoursWorked: {
    projectHours: { type: Number, default: 0.0 },
    internalHours: { type: Number, default: 0.0 },
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curClientId',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'curProjectId',
  },
  task: {
    type: String,
    default: '',
  },
  // date
  startTime: {
    type: String,
    default: '',
  },
  endTime: {
    type: String,
  },
  totalPerformance: { type: Number, default: 0 },
  screenshots: [{ type: mongoose.Types.ObjectId, ref: 'Screenshot' }],
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
