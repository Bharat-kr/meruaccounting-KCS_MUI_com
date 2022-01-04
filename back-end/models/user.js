import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    // default: "admin",
  },
  isAdmin: Boolean,
  isManager: Boolean,
  company: String,
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  // employees: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // }],
  settings: {
    ScreenShotPerHour: {
      type: Number,
      default: 6,
    },
    AllowBlur: {
      type: Boolean,
      default: false,
    },
    AppsAndUrlTracking: {
      type: Boolean,
      default: true,
    },
    WeeklyTimeLimit: {
      type: Number,
      default: 120,
    },
    AutoPause: {
      type: Number,
      default: 4,
    },
    OfflineTime: {
      type: Boolean,
      default: false,
    },
    NotifyUser: {
      type: Boolean,
      default: true,
    },
    WeekStart: {
      type: String,
      default: "Monday",
    },
    CurrencySymbol: {
      type: String,
      default: "$",
    },
  },
  payRate: Number,
  lastActive: Date,
  activityStatus: Boolean,

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
