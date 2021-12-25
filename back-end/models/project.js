import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
