import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/isAdmin";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const { userId, amount } = await req.json();

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } }, // amount can be positive or negative
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
}
