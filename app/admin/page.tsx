"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [numbers, setNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, numbersRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/numbers"),
      ]);

      setUsers(await usersRes.json());
      setNumbers(await numbersRes.json());
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateBalance = async (userId: string, amount: number) => {
    const res = await fetch("/api/admin/users/balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Balance updated!");
      setUsers(users.map(u => (u.id === userId ? { ...u, balance: data.balance } : u)));
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* Users Table */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Balance (₦)</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">₦{u.balance / 100}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateBalance(u.id, 1000 * 100)} // add ₦1000
                  >
                    +₦1000
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => updateBalance(u.id, -1000 * 100)} // deduct ₦1000
                  >
                    -₦1000
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Purchased Numbers */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Purchased Numbers</h2>
        <ul className="space-y-2">
          {numbers.map((num) => (
            <li key={num.id} className="p-3 border rounded flex justify-between">
              <span>
                {num.phoneNumber} — {num.user.email}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(num.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
