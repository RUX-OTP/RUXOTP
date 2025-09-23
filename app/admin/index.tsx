import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait
    if (!session) router.push("/auth/login");
    else if (session.user.role !== "admin") router.push("/dashboard");
  }, [session, status, router]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Welcome, {session.user.email}</p>
      <p>You have admin access ✅</p>
    </div>
  );
}
