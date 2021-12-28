import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  role: { type: String },
  isManager: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  payRate: Number,
  lastActive: String,
  activityStatus: Boolean,
  accountInfo: {
    managerFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    country: { type: String, default: 'India' },
    ip: { type: String },
    countryName: { type: String, default: 'India' },
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  settings: {
    ScreenShotPerHour: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Number, default: 6 },
      individualValue: { type: Number, default: 6 },
    },
    AllowBlur: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Boolean, default: false },
      individualValue: { type: Boolean, default: false },
    },
    AppsAndUrlTracking: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Boolean, default: true },
      individualValue: { type: Boolean, default: true },
    },
    WeeklyTimeLimit: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Number, default: 120 },
      individualValue: { type: Number, default: 120 },
    },
    AutoPause: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Number, default: 4 },
      individualValue: { type: Number, default: 4 },
    },
    OfflineTime: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Boolean, default: false },
      individualValue: { type: Boolean, default: false },
    },
    NotifyUser: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: Boolean, default: false },
      individualValue: { type: Boolean, default: false },
    },
    WeekStart: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: String, default: 'Monday' },
      individualValue: { type: String, default: 'Monday' },
    },
    CurrencySymbol: {
      isTeamSetting: { type: Boolean, required: true, default: true },
      teamValue: { type: String, default: '$' },
      individualValue: { type: String, default: '$' },
    },
  },
  days: [
    {
      date: Date,
      hours: Number,
      timeRange: [
        {
          startTime: Date,
          endTime: Date,
          activityLevelTotal: Number,
          screenShots: [
            {
              activityLevel: Number,
              url: String,
              time: Date,
              taskName: String,
            },
          ],
        },
      ],
    },
  ],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
