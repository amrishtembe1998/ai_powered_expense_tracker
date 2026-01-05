import { useState } from 'react';

export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border shadow-xl my-4 py-4 px-4">
        <h1 className="flex justify-center pb-4 text-2xl">{isLogin ? 'Sign Up' : 'Login'}</h1>
        {isLogin && (
          <>
            <div className="flex px-3 pb-2">
              <div className="p-1 whitespace-nowrap">First Name:</div>
              <input
                className="block w-full rounded-md bg-gray-50 p-1"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
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
                  setLastName(e.target.value);
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
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex px-3 pb-2">
          <div className="p-1">Password:</div>
          <input
            className="block w-full rounded-md bg-gray-50 p-1"
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center pt-6">
          {isLogin ? 'Already have an account?' : 'Not a member?'}
          <button
            className="text-black cursor-pointer pl-2"
            onClick={() => {
              setIsLogin((prev) => !prev);
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
