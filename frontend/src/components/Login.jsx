import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { BACKEND_DOMAIN } from '../constants';

export default function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onAuthClickHandler = async (e) => {
    e.preventDefault();
    if (username && password) {
      if (isLogin) {
        try {
          setIsLoading(true);
          const response = await axios.post(`${BACKEND_DOMAIN}/api/v1/user/signin`, {
            username,
            password,
          });
          setIsLoading(false);
          localStorage.setItem('token', response.data.jwt);
          navigate('/home');
        } catch (error) {
          setError(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
      } else {
        try {
          setIsLoading(true);
          const response = await axios.post(`${BACKEND_DOMAIN}/api/v1/user/signup`, {
            username,
            password,
            firstName,
            lastName,
          });
          setIsLoading(false);
          localStorage.setItem('token', response.data.jwt);
          navigate('/home');
        } catch (error) {
          setError(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
      }
    } else {
      isLogin ? setError('Please enter Username and Password') : setError('Please enter all the details to continue');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border shadow-xl my-4 py-4 px-4">
        <h1 className="flex justify-center pb-4 text-2xl">{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <form onSubmit={onAuthClickHandler}>
          {!isLogin && (
            <>
              <div className="flex px-3 pb-2">
                <div className="p-1 whitespace-nowrap">First Name:</div>
                <input
                  className="block w-full rounded-md bg-gray-50 p-1"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value.trim());
                  }}
                />
              </div>
              <div className="flex px-3 pb-2">
                <div className="p-1 whitespace-nowrap">Last Name:</div>
                <input
                  className="block w-full rounded-md bg-gray-50 p-1"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value.trim());
                  }}
                />
              </div>
            </>
          )}
          <div className="flex px-3 pb-2">
            <div className="p-1">Username:</div>
            <input
              className="block w-full rounded-md bg-gray-50 p-1"
              type="text"
              placeholder="user@name.com"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.trim());
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex px-3 pb-2">
            <div className="p-1">Password:</div>
            <input
              className="block w-full rounded-md bg-gray-50 p-1"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value.trim());
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="text-blue-700 bg-blue-400 p-2 rounded-md px-4 cursor-pointer"
              onClick={onAuthClickHandler}
              disabled={isLoading}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="flex justify-center pt-6 text-red-600">{error}</div>
        <div className="flex justify-center pt-6">
          {isLogin ? 'Not a member?' : 'Already have an account?'}
          <button
            className="text-black cursor-pointer pl-2"
            onClick={() => {
              setError('');
              setUsername('');
              setPassword('');
              setFirstName('');
              setLastName('');
              setIsLogin((prev) => !prev);
            }}
            disabled={isLoading}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
