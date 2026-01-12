import mongoose from 'mongoose';
import { MAX_DB_RETRY } from '../frontend/src/constants.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function connectMongodbWithRetry() {
  const uri = 'mongodb://username:password@localhost:27017/';
  for (let i = 0; i < MAX_DB_RETRY; i++) {
    try {
      console.log(`MongoDB connection attempt ${i}`);
      await mongoose.connect(uri);
      console.log(`✅ Connected to MongoDB`);
      return;
    } catch (error) {
      console.error(`❌ Connection attempt ${i} failed`);
      if (i === MAX_DB_RETRY) {
        console.error('Max Retried Reached. Exiting');
        throw error;
      }
      const delay = sleep(1000 * Math.pow(5 * i - 1));
      console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
      await sleep(delay);
    }
  }
}
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
});

const expenseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // reference to User
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
});

export const User = mongoose.model('User', userSchema);
export const Expense = mongoose.model('Expenses', expenseSchema);
