import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
