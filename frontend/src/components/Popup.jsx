import React, { useState } from 'react';

const Popup = ({ setIsPopupOpened, setIsDeleteExpense }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="flex justify-center items-center text-lg font-semibold mb-4">Confirm delete</h2>
        <p className="flex justify-center items-center">Are you sure you want to delete this expense?</p>
        <div className="flex justify-center items-center">
          <button
            className="mt-4 px-3 py-1 bg-red-600 text-white rounded mx-2"
            onClick={() => {
              setIsPopupOpened(false);
              setIsDeleteExpense(true)
            }}
          >
            Delete Expense
          </button>
          <button
            className="mt-4 px-3 py-1 bg-blue-500 text-white rounded mx-2"
            onClick={() => setIsPopupOpened(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
