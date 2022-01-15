import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    role: { type: String },
    isManager: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, length: 6 },
    payRate: { type: Number, default: 100 },
    lastActive: { type: String, default: "0" },
    activityStatus: { type: Boolean, default: false },
    accountInfo: {
      // managerFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      ip: { type: String },
      countryName: { type: String, default: "India" },
      // add time zone as in mongo aggregation
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
      },
    ],
    status: {
      type: String,
      default: "null",
    },
    notifications: [
      {
        id: String,
        title: String,
        description: String,
        avatar: String,
        type: String,
        createdAt: Date,
        isUnRead: Boolean,
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
        teamValue: { type: String, default: "Monday" },
        individualValue: { type: String, default: "Monday" },
      },
      CurrencySymbol: {
        isTeamSetting: { type: Boolean, required: true, default: true },
        teamValue: { type: String, default: "$" },
        individualValue: { type: String, default: "$" },
      },
    },
    days: [
      {
        date: { type: String, default: "0" },
        hours: { type: Number, default: 0 },
        activities: [{ type: mongoose.Types.ObjectId, ref: "Activity" }],
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.updateSettings = async (employeeId, settings) => {
  const employee = await User.findById(employeeId);
  employee.settings = settings;
  employee.save();
};

userSchema.methods.setTeamInManager = async function (teamId) {
  const manager = this;
  manager.team.push(teamId);
  await manager.save();
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
