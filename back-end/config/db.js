import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import colors from "colors";

const connectDB = async () => {
  const __dirname = path.resolve();
  dotenv.config({ path: path.join(__dirname, "./.env") }); //local

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
