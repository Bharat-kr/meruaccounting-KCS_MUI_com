import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String },
  // manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
