"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [numbers, setNumbers] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        setBalance(data.balance);
        setNumbers(data.numbers);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Balance Card */}
      <div className="p-4 bg-blue-100 border rounded-lg">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <p className="text-xl font-bold text-blue-700">₦{balance / 100}</p>
      </div>

      {/* Purchased Numbers */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Numbers</h2>
        {numbers.length === 0 ? (
          <p>You haven’t purchased any numbers yet.</p>
        ) : (
          <ul className="space-y-3">
            {numbers.map((num: any) => (
              <li
                key={num.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p className="font-semibold">{num.phoneNumber}</p>
                  <p className="text-sm text-gray-500">
                    Purchased on{" "}
                    {new Date(num.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-green-600 font-bold">Active</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
