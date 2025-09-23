import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="text-lg">💰 Wallet Balance: ₦{user?.balance}</p>
    </div>
  );
}
