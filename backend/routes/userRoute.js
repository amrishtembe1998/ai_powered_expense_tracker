import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../db.js';
import { signupSchema, signinSchema } from '../schemas/index.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(401).json({ message: 'Invalid inputs' });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: `User already exist with email ${email}` });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const dbResponse = await User.create({ email, password: hashedPassword });
    const signedJWT = jwt.sign({ id: dbResponse._id, email }, JWT_SECRET);
    res.json({ jwt: signedJWT });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Something went wrong in the DB operation' });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
      return res.status(401).json({ message: 'Invalid inputs' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const signedJWT = jwt.sign({ id: user._id, email }, JWT_SECRET);
    res.json({ jwt: signedJWT });
  } catch (error) {
    console.error('Error during user signin:', error);
    res.status(500).json({ message: 'Something went wrong in the DB operation' });
  }
});
