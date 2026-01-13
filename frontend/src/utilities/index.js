import axios from 'axios';
import { BACKEND_DOMAIN } from '../constants';

export async function addExpense(date, amount, title, description) {
  const token = localStorage.getItem('token');
  const result = await axios.post(
    `${BACKEND_DOMAIN}/api/v1/expense/addExpense`,
    {
      date,
      amount,
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
}

export async function fetchExpenses() {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${BACKEND_DOMAIN}/api/v1/expense/getExpenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function patchExpense(expenseId, editedExpense) {
  const token = localStorage.getItem('token');
  const { data } = await axios.patch(
    `${BACKEND_DOMAIN}/api/v1/expense/patchExpense/${expenseId}`,
    {
      data: editedExpense,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function deleteExpenses(expenseId) {
  const token = localStorage.getItem('token');
  const { data } = await axios.delete(`${BACKEND_DOMAIN}/api/v1/expense/deleteExpense/${expenseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
