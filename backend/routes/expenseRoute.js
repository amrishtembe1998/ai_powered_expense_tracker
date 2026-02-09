import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from '../middlewares/index.js';
import { addExpenseSchema } from '../schemas/index.js';
import { Expense } from '../db.js';

export const expenseRouter = express.Router();

expenseRouter.post('/addExpense', authMiddleware, async (req, res) => {
  const { uid } = req.user; // safe, verified uid
  const { amount, title, description, date } = req.body;
  const { success } = addExpenseSchema.safeParse(req.body);
  console.log("Success: ", success);
  console.log("UID from addExpense: ", uid);
  if (!success) {
    return res.status(400).json({ message: 'Invalid Input' });
  }
  try {
    const expense = await Expense.create({ userId: uid, amount: Number(amount), title, description, date });
    res.status(201).json({ message: 'Expense created', expense });
  } catch (error) {
    console.error('Error during expense creation:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});

expenseRouter.get('/getExpenses', authMiddleware, async (req, res) => {
  const { uid } = req.user; // safe, verified uid
  try {
    console.log("UID: ", uid);
    const data = await Expense.find({ userId: uid });
    res.json(data);
  } catch (error) {
    console.error('Error during fetching expenses:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});

expenseRouter.patch('/patchExpense/:expenseId', authMiddleware, async (req, res) => {
  const { expenseId } = req.params;
  const { data } = req.body;
  if (!expenseId || !data) {
    return res.status(400).json({ message: 'Invalid Inputs' });
  }
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(400).json({ message: 'Invalid expense id format' });
  }
  try {
    const result = await Expense.find({ _id: expenseId });
    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid Expense ID provided' });
    }
    const response = await Expense.findByIdAndUpdate(expenseId, { $set: data }, { new: true, runValidators: true });
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error during updating expenses:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});

expenseRouter.delete('/deleteExpense/:expenseId', authMiddleware, async (req, res) => {
  const { expenseId } = req.params;
  if (!expenseId) {
    return res.status(400).json({ message: 'Invalid Inputs' });
  }
  try {
    const result = await Expense.deleteOne({ _id: expenseId });
    if (!result) {
      return res.status(500).json({ message: 'Something went wrong in DB operation' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error during deleting expenses:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});
