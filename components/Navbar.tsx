"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        RuxOTP
      </Link>
      <div className="space-x-6">
        <Link href="/services" className="hover:text-blue-600">
          Services
        </Link>
        <Link href="/buy-number" className="hover:text-blue-600">
          Buy Number
        </Link>
        <Link href="/auth/login" className="hover:text-blue-600">
          Login
        </Link>
        <Link href="/auth/signup" className="hover:text-blue-600">
          Signup
        </Link>
      </div>
    </nav>
  );
}
