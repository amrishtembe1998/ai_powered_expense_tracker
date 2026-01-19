import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Button, Link, Input } from '@mui/material';
import { BACKEND_DOMAIN } from '../constants';

export default function Login() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const onAuthClickHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      if (isLogin) {
        try {
          setIsLoading(true);
          const response = await axios.post(`${BACKEND_DOMAIN}/api/v1/user/signin`, {
            email,
            password,
          });
          setIsLoading(false);
          localStorage.setItem('token', response.data.jwt);
          navigate('/home');
        } catch (error) {
          setIsLoading(false);
          setError(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
      } else {
        try {
          setIsLoading(true);
          const response = await axios.post(`${BACKEND_DOMAIN}/api/v1/user/signup`, {
            email,
            password,
            firstName,
            lastName,
          });
          setIsLoading(false);
          localStorage.setItem('token', response.data.jwt);
          navigate('/home');
        } catch (error) {
          setIsLoading(false);
          setError(error?.response?.data?.message || 'Something went wrong. Please try again.');
        }
      }
    } else {
      isLogin ? setError('Please enter email and Password') : setError('Please enter all the details to continue');
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="border shadow-xl py-4 px-16 bg-white text-black rounded-4xl mb-6">
        <h1 className="flex justify-center pb-4 text-2xl">{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <form onSubmit={onAuthClickHandler}>
          {!isLogin && (
            <>
              <div className="flex px-3 pb-3">
                <div className="p-1 whitespace-nowrap">First Name</div>
                <Input
                  className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value.trim());
                  }}
                />
              </div>
              <div className="flex px-3 pb-3">
                <div className="p-1 whitespace-nowrap">Last Name</div>
                <Input
                  className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
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
          <div className="flex px-3 pb-3">
            <div className="p-1 pr-11">Email</div>
            <Input
              className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
              type="text"
              placeholder="user@name.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
              onClick={() => setError('')}
            />
          </div>
          <div className="flex px-3 pb-3">
            <div className="p-1 pr-3">Password</div>
            <Input
              className="block w-full rounded-md bg-gray-200 pl-1 pr-4"
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
            <Button
              variant="contained"
              type="submit"
              //className="text-blue-700 bg-blue-400 p-2 rounded-md px-4 cursor-pointer"
              onClick={onAuthClickHandler}
              disabled={isLoading}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <div className="flex justify-center pt-6 text-red-600">{error}</div>
        <div className="flex justify-center pt-6">
          {isLogin ? 'Not a member?' : 'Already have an account?'}
          <Link
            variant="outlined"
            className="cursor-pointer pl-2"
            onClick={() => {
              setError('');
              setEmail('');
              setPassword('');
              setFirstName('');
              setLastName('');
              setIsLogin((prev) => !prev);
            }}
            disabled={isLoading}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </Link>
        </div>
      </div>
    </div>
  );
}
