import prisma from "@/lib/prisma";

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    include: { user: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="p-2 border">{t.id}</td>
              <td className="p-2 border">{t.user.email}</td>
              <td className="p-2 border">${t.amount.toFixed(2)}</td>
              <td className="p-2 border">{t.type}</td>
              <td className="p-2 border">
                {new Date(t.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
