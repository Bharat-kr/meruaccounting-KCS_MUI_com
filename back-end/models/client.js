import mongoose from 'mongoose';
import User from './user.js';
import Project from '../models/project.js';

const clientSchema = new mongoose.Schema({
  name: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
