const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = require("./team");

const userSchema = new Schema({
  role: {
    type: String,
    // default: "admin",
  },
  company: String,
  fistName: {
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
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
  },
  Settings: {
    ScreenShotPerHour: Number,
    AllowBlur: Boolean,
    AppsAndUrlTracking: Boolean,
    WeeklyTimeLimit: Number,
    AutoPause: Number,
    OfflineTime: Boolean,
    NotifyUser: Boolean,
    WeekStart: String,
    CurrencySymbol: String,
  },
  pay: Number,
  day: [
    {
      date: Date,
      hours: Number,
      timeRange: [
        {
          startTime: Date,
          endTime: Date,
          activityLevel: Number,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
