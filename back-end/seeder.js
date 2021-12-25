import dotenv from 'dotenv';
import colors from 'colors';
import { connect } from 'mongoose';
import connectDB from './config/db';

// import data

// import models

import db from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await model.deleteMany(); .... repeat for all
    // await model.insertMany(data); ... repeat for all
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = (async) => {
  try {
    // await model.deleteMany(); .... repeat for all
    console.log(`Data destroyed`.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? destroyData() : importData();
