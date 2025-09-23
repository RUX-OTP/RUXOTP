import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const user = await prisma.user.findFirst(); // (replace with logged-in user later)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg">💰 Wallet Balance: <b>₦{user?.balance}</b></p>
      </div>
    </div>
  );
}

