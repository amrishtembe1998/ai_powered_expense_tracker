import axios from 'axios';
import { BACKEND_DOMAIN } from '../constants';
import { getAuth } from 'firebase/auth';


async function getIdTokenOrRefresh() {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('No current user');
  // true forces refresh; omit or set false to use cached token
  return await auth.currentUser.getIdToken(/* forceRefresh = */ false);
}

export async function addExpense(date, amount, title, description) {
  const token = await getIdTokenOrRefresh();
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
    },
  );
  return result;
}

export async function fetchExpenses() {
  const token = await getIdTokenOrRefresh();
  const { data } = await axios.get(`${BACKEND_DOMAIN}/api/v1/expense/getExpenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function patchExpense(expenseId, editedExpense) {
  const token = await getIdTokenOrRefresh();
  const { data } = await axios.patch(
    `${BACKEND_DOMAIN}/api/v1/expense/patchExpense/${expenseId}`,
    {
      data: editedExpense,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}

export async function deleteExpenses(expenseId) {
  const token = await getIdTokenOrRefresh();
  const { data } = await axios.delete(`${BACKEND_DOMAIN}/api/v1/expense/deleteExpense/${expenseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
