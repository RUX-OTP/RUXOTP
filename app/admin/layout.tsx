import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block hover:underline">
            Users
          </Link>
          <Link href="/admin/numbers" className="block hover:underline">
            Numbers
          </Link>
          <Link href="/admin/transactions" className="block hover:underline">
            Transactions
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
