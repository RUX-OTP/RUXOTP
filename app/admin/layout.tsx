// app/admin/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdmin(); // 🔐 Block non-admins
  } catch (err) {
    redirect("/"); // 🚪 Redirect to home if not admin
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            👤 Manage Users
          </Link>
          <Link
            href="/admin/numbers"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            📞 Purchased Numbers
          </Link>
          <Link
            href="/admin/payments"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            💳 Payments
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
