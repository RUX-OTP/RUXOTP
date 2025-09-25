"use client";

import { useEffect, useState } from "react";

export default function AdminNumbersPage() {
  const [numbers, setNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const res = await fetch("/api/admin/numbers");
        const data = await res.json();
        if (res.ok) setNumbers(data);
        else alert(data.error || "Failed to fetch numbers");
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Purchased Numbers</h2>
      <ul className="space-y-2">
        {numbers.map((num) => (
          <li key={num.id} className="p-2 border rounded">
            <strong>{num.phoneNumber}</strong> — User: {num.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
