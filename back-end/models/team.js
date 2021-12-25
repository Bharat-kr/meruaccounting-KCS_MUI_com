import mongoose from 'mongoose';
import User from './user.js';
import Project from '../models/project.js';

const teamSchema = new mongoose.Schema({
  name: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
