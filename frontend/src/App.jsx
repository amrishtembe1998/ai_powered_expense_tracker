import './App.css';
import Login from './components/Login';
import { DialogTitle } from '@mui/material';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <h1 className="flex justify-center items-center pt-24 text-6xl">Expense Tracker App</h1>
      <Login />
    </div>
  );
}

export default App;
