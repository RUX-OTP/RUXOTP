// pages/dashboard/index.tsx
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import type { GetServerSideProps } from "next";

type Props = {
  wallet: number;
  email: string;
};

export default function Dashboard({ wallet, email }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {email}</h1>
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
        <p className="text-lg">Wallet Balance</p>
        <h2 className="text-3xl font-bold mt-2">₦{wallet / 100}</h2>
      </div>
    </div>
  );
}

// 🔑 Fetch balance from DB
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { wallet: true, email: true },
  });

  return {
    props: {
      wallet: user?.wallet || 0,
      email: user?.email || "",
    },
  };
};
