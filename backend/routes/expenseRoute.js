import express from 'express';
import { authMiddleware } from '../middlewares/index.js';
import { addExpenseSchema } from '../schemas/index.js';
import { Expense } from '../db.js';

export const expenseRouter = express.Router();

expenseRouter.post('/addExpense', authMiddleware, async (req, res) => {
  const { amount, title, description, date } = req.body;
  const { success } = addExpenseSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: 'Invalid Input' });
  }
  try {
    const expense = await Expense.create({ user: req.userId, amount: Number(amount), title, description, date });
    res.status(201).json({ message: 'Expense created', expense });
  } catch (error) {
    console.error('Error during expense creation:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});

expenseRouter.get('/getExpenses', authMiddleware, async (req, res) => {
  try {
    const data = await Expense.find({ user: req.userId });
    res.json(data);
  } catch (error) {
    console.error('Error during fetching expenses:', error);
    res.status(500).json({ message: `Something went wrong in the DB operation ${error}` });
  }
});
