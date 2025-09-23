// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();

        if (res.ok) {
          setUsers(data);
        } else {
          alert(data.error || "Failed to fetch users");
        }
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateBalance = async (userId: string, amount: number) => {
    try {
      const res = await fetch("/api/admin/users/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Balance updated successfully!");
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, balance: data.balance } : u
          )
        );
      } else {
        alert(data.error || "Failed to update balance");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel - Users</h1>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Balance (₦)</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">₦{user.balance / 100}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateBalance(user.id, 1000 * 100)} // Add ₦1000
                >
                  +₦1000
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => updateBalance(user.id, -1000 * 100)} // Deduct ₦1000
                >
                  -₦1000
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
