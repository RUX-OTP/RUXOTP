import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/isAdmin";

export async function GET() {
  try {
    await requireAdmin();
    const numbers = await prisma.purchasedNumber.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(numbers);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
}
