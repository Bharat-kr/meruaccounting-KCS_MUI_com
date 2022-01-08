import dotenv from 'dotenv';
import colors from 'colors';
import asyncHandler from 'express-async-handler';
import connectDB from './config/db.js';

// import data
import users from './data/users.js';

import User from './models/user.js';
import Team from './models/team.js';
import Client from './models/client.js';
import Project from './models/project.js';
import Activity from './models/activity.js';
import Screenshot from './models/screenshot.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const importData = asyncHandler(async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log(`Data imported`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
});

const destroyData = asyncHandler(async () => {
  try {
    // await User.deleteMany();
    // await Client.deleteMany();
    // await Project.deleteMany();
    // await Team.deleteMany();
    await Activity.deleteMany();
    await Screenshot.deleteMany();

    console.log(`Data destroyed`.red.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
});

process.argv[2] === '-d' ? destroyData() : importData();
