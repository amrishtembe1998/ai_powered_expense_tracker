import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BACKEND_DOMAIN } from '../constants';
import ExpensesList from './ExpensesList';
import { fetchExpenses } from '../utilities';

const Home = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [addExpenseTrigger, setAddExpenseTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [error, setError] = useState('');
  const [editExpense, setEditExpense] = useState(false);
  const [deleteExpense, setDeleteExpense] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {}, [editExpense]);

  useEffect(() => {
    async function getExpenseData() {
      setIsLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
      setIsLoading(false);
    }
    getExpenseData();
  }, [addExpenseTrigger]);

  const onAddExpenseClickHandler = async () => {
    if (!date || !amount || !title) {
      setError('Enter all the fields');
      return;
    }
    const token = localStorage.getItem('token');
    await axios.post(
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
    setAddExpenseTrigger((prev) => prev + 1);
  };
  if (isLoading) {
    return <h1 className="flex justify-center items-center h-screen">Loading...</h1>;
  }
  return (
    <div>
      <div className="flex justify-center mt-4 text-5xl">Expense Tracker</div>
      <form
        onSubmit={() => {
          onAddExpenseClickHandler;
        }}
      >
        <div className="flex justify-center m-8">
          <div className="flex items-center">
            <div>Pick a Date:</div>
            <input
              type="date"
              className="border p-1 mx-1 rounded-md"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex items-center">
            <div>Amount: </div>
            <input
              type="number"
              className="border p-1 mx-1 rounded-md"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex items-center">
            <div>Title: </div>
            <input
              type="text"
              className="border p-1 mx-1 rounded-md"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex items-center mx-2">
            <div>Description: </div>
            <input
              type="text"
              className="border p-1 mx-1 rounded-md"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onClick={() => setError('')}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="p-2 border-2 rounded-lg bg-blue-50 text-blue-900 border-blue-900 cursor-pointer hover:bg-blue-300"
            onClick={onAddExpenseClickHandler}
          >
            Add Expense
          </button>
        </div>
      </form>
      {error && <h3 className="text-red-800 flex justify-center items-center. mt-2">{error}</h3>}
      <ExpensesList
        expenses={expenses}
        setEditExpense={setEditExpense}
        setDeleteExpense={setDeleteExpense}
        date={date}
        setDate={setDate}
        amount={amount}
        setAmount={setAmount}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default Home;
