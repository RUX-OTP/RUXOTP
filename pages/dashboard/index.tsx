import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl">Welcome, {session.user.email}</h1>
      <p>Your ID: {session.user.id}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}
