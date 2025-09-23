import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.event === "charge.success") {
      const { email, amount } = body.data;

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        // Save transaction
        await prisma.transaction.create({
          data: {
            userId: user.id,
            amount: amount / 100,
            type: "credit",
          },
        });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

