import { useState } from "react";
import { CheckCircle, Clock, RotateCcw } from "lucide-react";

const BorrowReturn = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: "John Doe",
      book: "The Alchemist",
      borrowDate: "2025-05-01",
      returnDate: "2025-05-10",
      returned: false,
    },
    {
      id: 2,
      user: "Jane Smith",
      book: "Atomic Habits",
      borrowDate: "2025-04-28",
      returnDate: "2025-05-05",
      returned: true,
    },
  ]);

  const handleReturn = (id) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, returned: true } : tx
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔄 Borrow / Return</h2>
        <p className="text-sm text-gray-500">Manage borrowed books and return statuses.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Borrowed On</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ? (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-t text-sm">
                  <td className="py-2 px-4">{tx.user}</td>
                  <td className="py-2 px-4">{tx.book}</td>
                  <td className="py-2 px-4">{tx.borrowDate}</td>
                  <td className="py-2 px-4">{tx.returnDate}</td>
                  <td className="py-2 px-4">
                    {tx.returned ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} /> Returned
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Clock size={16} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {!tx.returned && (
                      <button
                        onClick={() => handleReturn(tx.id)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                      >
                        <RotateCcw size={14} /> Mark Returned
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No borrow records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowReturn;
