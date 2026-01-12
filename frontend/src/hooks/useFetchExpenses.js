import axios from 'axios';
import { BACKEND_DOMAIN } from '../constants';

export async function useFetchExpenses() {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${BACKEND_DOMAIN}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
