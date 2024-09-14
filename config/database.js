import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mongoURI } from './config.js';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI).then(() => console.log('MongoDB Connected Successfully'));
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
