import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String },
  budgetedHours: { type: Number },
  projectLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  // team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
