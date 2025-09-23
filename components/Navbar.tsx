import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between bg-gray-800 p-4 text-white">
      <Link href="/">Home</Link>
      {session ? (
        <div className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
          {session.user.role === "admin" && <Link href="/admin">Admin</Link>}
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}
