"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BuyNumberPage() {
  const params = useSearchParams();
  const country = params.get("country");
  const code = params.get("code");
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");

  async function handleBuy() {
    setLoading(true);
    const res = await fetch("/api/buy-number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, code }),
    });
    const data = await res.json();
    setNumber(data.number || "Failed");
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Buy Number for {country} ({code})
      </h2>
      <button
        onClick={handleBuy}
        className="bg-blue-600 text-white px-6 py-3 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Number"}
      </button>

      {number && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p className="font-semibold">Your new number:</p>
          <p className="text-xl text-green-600">{number}</p>
        </div>
      )}
    </div>
  );
}

