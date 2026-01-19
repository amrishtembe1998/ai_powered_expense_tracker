import zod from 'zod';

export const signupSchema = zod.object({
  email: zod.email(),
  password: zod.string().min(8),
  firstName: zod.string().min(4),
  lastName: zod.string().min(4),
});

export const signinSchema = zod.object({
  email: zod.email(),
  password: zod.string().min(8),
});

export const addExpenseSchema = zod.object({
  amount: zod.string().min(1),
  title: zod.string().min(1),
  description: zod.string().optional(),
  date: zod.string().min(1),
});
