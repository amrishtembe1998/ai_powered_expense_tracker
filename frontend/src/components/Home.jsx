import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ExpensesList from './ExpensesList';
import { fetchExpenses, patchExpense, deleteExpenses, addExpense } from '../utilities';

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
  const [editExpense, setEditExpense] = useState({});
  const [isDeleteExpense, setIsDeleteExpense] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    async function updateExpense(editExpense) {
      setIsLoading(true);
      const data = await patchExpense(editExpense._id, editExpense);
      if (!data) {
        setError('Something wrong in updating the data. Please try again');
      }
      setIsLoading(false);
      setAddExpenseTrigger((prev) => prev + 1);
    }
    if (Object.hasOwn(editExpense, '_id')) updateExpense(editExpense);
  }, [editExpense]);

  useEffect(() => {
    async function getExpenseData() {
      setIsLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
      setIsLoading(false);
    }
    getExpenseData();
  }, [addExpenseTrigger]);

  useEffect(() => {
    async function performDelete() {
      setIsLoading(true);
      const data = await deleteExpenses(deleteExpenseId);
      if (!data) {
        setError('Something wrong in updating the data. Please try again');
      }
      setIsLoading(false);
      setAddExpenseTrigger((prev) => prev + 1);
      setIsDeleteExpense(false);
      setDeleteExpenseId('');
    }
    if (isDeleteExpense && deleteExpenseId) performDelete();
  }, [isDeleteExpense, deleteExpenseId]);

  const onAddExpenseClickHandler = async (event) => {
    event.preventDefault();
    if (!date || !amount || !title) {
      setError('Enter all the fields');
      return;
    }

    try {
      const { status } = await addExpense(date, amount, title, description);
      console.log('Result: ', status);
      if (status !== 201) {
        throw new Error('Error while creating an expense');
      }
      setAddExpenseTrigger((prev) => prev + 1);
      setDate(today);
      setAmount(0);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(`Error has occured while calling addExpense API: ${error}`);
    }
  };
  if (isLoading) {
    return <h1 className="flex justify-center items-center h-screen">Loading...</h1>;
  }
  return (
    <div>
      <div className="mb-8 bg-gray-900">
        <div className="flex justify-center text-5xl pt-6">Expense Tracker</div>
        <form
          onSubmit={(event) => {
            onAddExpenseClickHandler(event);
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
                className="border mx-1 rounded-md"
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
        {expenses.length === 0 ? (
          <h1 className="flex justify-center h-screen mt-8 text-4xl">Add Expenses to get started</h1>
        ) : (
          <ExpensesList
            expenses={expenses}
            setEditExpense={setEditExpense}
            setIsDeleteExpense={setIsDeleteExpense}
            setDeleteExpenseId={setDeleteExpenseId}
            error={error}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
