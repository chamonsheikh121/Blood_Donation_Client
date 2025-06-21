import { useState } from "react";
import { CheckCircle, AlertTriangle, DollarSign } from "lucide-react";

const FinesPayments = () => {
  const [fines, setFines] = useState([
    {
      id: 1,
      user: "John Doe",
      reason: "Late return - The Alchemist",
      amount: 5,
      status: "unpaid",
    },
    {
      id: 2,
      user: "Jane Smith",
      reason: "Book damage - Atomic Habits",
      amount: 10,
      status: "paid",
    },
  ]);

  const handlePayment = (id) => {
    setFines((prev) =>
      prev.map((fine) =>
        fine.id === id ? { ...fine, status: "paid" } : fine
      )
    );
  };

  const totalCollected = fines
    .filter((f) => f.status === "paid")
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPending = fines
    .filter((f) => f.status === "unpaid")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">💰 Fines & Payments</h2>
        <p className="text-sm text-gray-500">Track fines and manage user payments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">Total Collected</p>
          <h3 className="text-2xl font-bold text-green-800">${totalCollected}</h3>
        </div>
        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700">Pending Fines</p>
          <h3 className="text-2xl font-bold text-yellow-800">${totalPending}</h3>
        </div>
      </div>

      {/* Fines Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {fines.length ? (
              fines.map((fine) => (
                <tr key={fine.id} className="border-t text-sm">
                  <td className="py-2 px-4">{fine.user}</td>
                  <td className="py-2 px-4">{fine.reason}</td>
                  <td className="py-2 px-4">${fine.amount}</td>
                  <td className="py-2 px-4">
                    {fine.status === "paid" ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <AlertTriangle size={16} /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {fine.status === "unpaid" && (
                      <button
                        onClick={() => handlePayment(fine.id)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                      >
                        <DollarSign size={14} /> Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No fines available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinesPayments;
