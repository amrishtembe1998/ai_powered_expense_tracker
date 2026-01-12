import axios from "axios";
import { BACKEND_DOMAIN } from "../constants";

export async function fetchExpenses() {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${BACKEND_DOMAIN}/api/v1/expense/getExpenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
