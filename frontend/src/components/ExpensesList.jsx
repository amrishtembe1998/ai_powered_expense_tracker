import React, { useState } from 'react';
import Popup from './Popup';
import { Button, Input, Stack } from '@mui/material';

const ExpensesList = ({ expenses, setEditExpense, setIsDeleteExpense, setDeleteExpenseId, error, setError }) => {
  const today = new Date().toISOString().split('T')[0];
  const [editingId, setEditingId] = useState(null);
  const [editedAmount, setEditedAmount] = useState(0);
  const [editedDate, setEditedDate] = useState(today);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const handleEditExpense = (expense) => {
    setError('');
    setEditingId(expense._id);
    setEditedDate(expense.date?.split('T')[0] ?? '');
    setEditedAmount(expense.amount ?? '');
    setEditedTitle(expense.title ?? '');
    setEditedDescription(expense.description ?? '');
  };

  const handleDeleteExpense = (expense) => {
    setIsPopupOpened(true);
    setDeleteExpenseId(expense._id);
  };

  return (
    <div className="flex justify-center mt-4">
      <table className="table-fixed border-2 w-full mx-12 bg-gray-900">
        <colgroup>
          <col className="w-[5%]" /> {/* Sr No */}
          <col className="w-[10%]" /> {/* Date */}
          <col className="w-[8%]" /> {/* Amount */}
          <col className="w-[30%]" /> {/* Title (MAX SPACE) */}
          <col className="w-[20%]" /> {/* Description */}
          <col className="w-[37%]" /> {/* Actions */}
        </colgroup>
        <thead className="border-2">
          <tr>
            <th className="border-2 py-2">Sr No</th>
            <th className="border-2 py-2">Date</th>
            <th className="border-2 py-2">Amount</th>
            <th className="border-2 py-2">Title</th>
            <th className="border-2 py-2">Description</th>
            <th className="border-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const isRowEditable = editingId === expense._id;
            return (
              <tr
                key={expense._id}
                className={`border-2 ${Math.ceil(index % 2) === 0 ? 'bg-gray-800' : 'bg-gray-600'}`}
              >
                <td className="border-2 text-center">{index + 1}</td>
                <td className="border-2 text-center">
                  <div className="block max-w-full overflow-x-auto whitespace-nowrap">
                    {isRowEditable ? (
                      <Input
                        className="w-full bg-white"
                        type="date"
                        value={editedDate}
                        onChange={(e) => {
                          setEditedDate(e.target.value);
                        }}
                        onClick={() => setError('')}
                      />
                    ) : (
                      new Date(expense.date).toLocaleDateString()
                    )}
                  </div>
                </td>
                <td className="border-2 text-center">
                  <div className="block max-w-full overflow-x-auto whitespace-nowrap">
                    {isRowEditable ? (
                      <Input
                        type="number"
                        className="border p-1 rounded-md w-full bg-white"
                        placeholder="Amount"
                        value={editedAmount}
                        onChange={(e) => {
                          setEditedAmount(e.target.value);
                        }}
                        onClick={() => setError('')}
                      />
                    ) : (
                      expense.amount
                    )}
                  </div>
                </td>
                <td className="border-2 px-2">
                  {isRowEditable ? (
                    <div className="block max-w-full overflow-x-auto">
                      <Input
                        type="text"
                        className="border p-1 rounded-md w-full bg-white"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="block max-w-full overflow-x-auto whitespace-nowrap">{expense.title}</div>
                  )}
                </td>
                <td className="border-2 text-center ">
                  {isRowEditable ? (
                    <div className="block max-w-full overflow-x-auto">
                      <Input
                        type="text"
                        className="border p-1 rounded-md w-full bg-white"
                        placeholder="Description"
                        value={editedDescription}
                        onChange={(e) => {
                          setEditedDescription(e.target.value);
                        }}
                        onClick={() => setError('')}
                      />
                    </div>
                  ) : (
                    <div className="block max-w-full overflow-x-auto whitespace-nowrap">{expense.description}</div>
                  )}
                </td>
                <td className="border-2">
                  <div className="flex items-center justify-center gap-1">
                    {isRowEditable && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          className="border px-2 py-0.5 bg-blue-300 cursor-pointer"
                          onClick={() => {
                            setError('');
                            setEditExpense({
                              _id: expense._id,
                              date: editedDate,
                              amount: editedAmount,
                              title: editedTitle,
                              description: editedDescription,
                            });
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          className="border px-2 py-0.5 bg-red-400 cursor-pointer"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    <Stack spacing={2} direction="row" className="py-3">
                      <Button variant="contained" onClick={() => handleEditExpense(expense)}>
                        Edit expense
                      </Button>
                      {!isRowEditable && (
                        <Button variant="contained" color="warning" onClick={() => handleDeleteExpense(expense)}>
                          Delete expense
                        </Button>
                      )}
                    </Stack>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPopupOpened && <Popup setIsPopupOpened={setIsPopupOpened} setIsDeleteExpense={setIsDeleteExpense} />}
    </div>
  );
};

export default ExpensesList;
