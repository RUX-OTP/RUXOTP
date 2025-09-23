"use client";

import { useState } from "react";

export default function BuyNumberPage() {
  const [country, setCountry] = useState("NG");
  const [numbers, setNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNumbers = async () => {
    setLoading(true);
    const res = await fetch(`/api/numbers?country=${country}`);
    const data = await res.json();
    setNumbers(data.numbers);
    setLoading(false);
  };

  const buyFromWallet = async (phoneNumber: string) => {
    const res = await fetch("/api/numbers/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await res.json();

    if (data.success) {
      alert("Number purchased successfully!");
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Failed to buy number");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buy a Virtual Number</h1>

      <select
        className="border p-2 rounded"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="NG">Nigeria</option>
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="CA">Canada</option>
      </select>

      <button
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={fetchNumbers}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Numbers"}
      </button>

      <div className="mt-6 space-y-4">
        {numbers.length > 0 ? (
          numbers.map((num, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                {num.friendlyName} ({num.phoneNumber})
              </span>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => buyFromWallet(num.phoneNumber)}
              >
                Buy ₦500
              </button>
            </div>
          ))
        ) : (
          <p>No numbers yet. Select country and click fetch.</p>
        )}
      </div>
    </div>
  );
}
