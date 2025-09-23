import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, numberId, price } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.balance < price) {
      return NextResponse.json({ error: "Insufficient balance ❌" }, { status: 400 });
    }

    // Deduct balance
    await prisma.user.update({
      where: { id: user.id },
      data: { balance: { decrement: price } },
    });

    // Save transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: price,
        type: "debit",
      },
    });

    // Assign number to user
    await prisma.number.update({
      where: { id: numberId },
      data: { userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Buy failed" }, { status: 500 });
  }
}
