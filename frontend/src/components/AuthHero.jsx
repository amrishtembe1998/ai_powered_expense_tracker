import React from 'react';
import Logo from '../assests/images/logo.svg';
import expenseImage from '../assests/images/expenseScreen.webp';

const AuthHero = () => {
  return (
    <div>
      <img className="max-w-36 max-h-36 p-4" src={Logo} alt="branding logo" />
      <div className="flex flex-col justify-center items-center text-white font-bold text-4xl mt-16">
        <div>Your Finances</div>
        <div>in One Place</div>
        <img
          src={expenseImage}
          alt="Expense screen"
          className="mt-6 w-92 drop-shadow-[0_25px_60px_rgba(255,255,255,0.65)]"
        />
        <div className='font-light text-sm mt-8'>Dive into reports, build budgets, sync with your</div>
        <div className='text-sm font-light'>banks and enjoy automatic categorization.</div>
      </div>
    </div>
  );
};

export default AuthHero;
