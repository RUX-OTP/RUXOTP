"use client";

import { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/get-users") // assuming you have a users API
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Users</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <ul>
        {users.map((user, i) => (
          <li key={i} className="border p-2 rounded mb-2">
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
