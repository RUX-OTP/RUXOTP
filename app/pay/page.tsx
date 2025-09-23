"use client";
import { useState } from "react";

export default function PayPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount }),
    });

    const data = await res.json();

    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      alert("Payment failed ❌");
    }
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Fund Account</h2>
      <form onSubmit={handlePay} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (NGN)"
          className="w-full p-3 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Pay with Paystack
        </button>
      </form>
    </div>
  );
}
