// app/admin/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdmin(); // 🔐 Block non-admins
  } catch (err) {
    redirect("/"); // 🚪 Send them back to home
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {children}
    </div>
  );
}
