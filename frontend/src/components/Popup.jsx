import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';

const Popup = ({ setIsPopupOpened, setIsDeleteExpense }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="flex justify-center items-center text-lg font-semibold mb-4 text-black">Confirm delete</h2>
        <p className="flex justify-center items-center text-black">Are you sure you want to delete this expense?</p>
        <div className="flex justify-center items-center">
          <Stack spacing={2} direction="row" className="py-3">
            <Button
              variant="contained"
              color='warning'
              className="mt-6 px-6 py-1 text-white rounded mx-2"
              onClick={() => {
                setIsPopupOpened(false);
                setIsDeleteExpense(true);
              }}
            >
              Delete Expense
            </Button>
            <Button
              variant="contained"
              color='red'
              className="mt-6 px-6 py-1 text-white rounded mx-2"
              onClick={() => setIsPopupOpened(false)}
            >
              Close
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Popup;
