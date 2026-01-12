import React, { useState } from 'react';

const ExpensesList = ({
  expenses,
  setEditExpense,
  setDeleteExpense,
  date,
  setDate,
  amount,
  setAmount,
  title,
  setTitle,
  description,
  setDescription,
  error,
  setError,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEditExpense = () => {
    setIsEditable(true);
  };
  const handleDeleteExpense = () => {};
  return (
    <div className="flex justify-center mt-4">
      <table className="table-fixed border-2 w-full mx-12">
        <colgroup>
          <col className="w-[5%]" /> {/* Sr No */}
          <col className="w-[10%]" /> {/* Date */}
          <col className="w-[10%]" /> {/* Amount */}
          <col className="w-[30%]" /> {/* Title (MAX SPACE) */}
          <col className="w-[25%]" /> {/* Description */}
          <col className="w-[20%]" /> {/* Actions */}
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
          {expenses.map((expense, index) => (
            <tr key={expense._id} className={`border-2 ${Math.ceil(index % 2) === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}>
              <td className="border-2 text-center">{index + 1}</td>
              <td className="border-2 text-center">
                <div className="block max-w-full overflow-x-auto whitespace-nowrap">
                  {isEditable ? (
                    <input
                      className="w-full"
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
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
                  {isEditable ? (
                    <input
                      type="number"
                      className="border p-1 rounded-md w-full"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      onClick={() => setError('')}
                    />
                  ) : (
                    expense.amount
                  )}
                </div>
              </td>
              <td className="border-2 px-2">
                {isEditable ? (
                  <div className="block max-w-full overflow-x-auto">
                    <input
                      type="text"
                      className="border p-1 rounded-md w-full"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="block max-w-full overflow-x-auto whitespace-nowrap">{expense.title}</div>
                )}
              </td>
              <td className="border-2 text-center ">
                {isEditable ? (
                  <div className="block max-w-full overflow-x-auto">
                    <input
                      type="text"
                      className="border p-1 rounded-md w-full"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
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
                  {isEditable && <button className="border px-2 py-0.5 bg-blue-300 cursor-pointer">Save</button>}
                  <button className="border px-2 py-0.5 m-1 bg-blue-300" onClick={() => handleEditExpense()}>
                    Edit expense
                  </button>
                  <button className="border px-2 py-0.5 bg-red-300" onClick={() => handleDeleteExpense()}>
                    Delete expense
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesList;
