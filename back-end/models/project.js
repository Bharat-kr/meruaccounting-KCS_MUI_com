import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, unique: 'true' },
    consumeTime: { type: Number, default: 0 },
    budgetTime: { type: Number, default: 0 },
    projectLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
