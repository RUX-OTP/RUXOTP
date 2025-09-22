// components/AuthForm.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.ok) {
        alert(data.message || "Error");
        setLoading(false);
        return;
      }
      // Save token
      if (data.token) {
        localStorage.setItem("rux_token", data.token);
      }
      // optional: store user
      if (data.user) localStorage.setItem("rux_user", JSON.stringify(data.user));
      // redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 capitalize">{type}</h2>

      <label className="block mb-2 text-sm">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2 text-sm">Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Create account"}
      </button>
    </form>
  );
                              }
