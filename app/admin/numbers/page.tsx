import prisma from "@/lib/prisma";

export default async function NumbersPage() {
  const numbers = await prisma.number.findMany({ include: { user: true } });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Purchased Numbers</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Number</th>
            <th className="p-2 border">Country</th>
            <th className="p-2 border">User</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((n) => (
            <tr key={n.id}>
              <td className="p-2 border">{n.id}</td>
              <td className="p-2 border">{n.phone}</td>
              <td className="p-2 border">{n.country}</td>
              <td className="p-2 border">{n.user?.email || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

