import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import twilio from "twilio";
import { authOptions } from "@/lib/auth";

const NUMBER_PRICE = 500 * 100; // ₦500 in kobo

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { phoneNumber } = await req.json();

  try {
    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check balance
    if (user.balance < NUMBER_PRICE) {
      return NextResponse.json(
        { error: "Insufficient balance. Please fund wallet." },
        { status: 400 }
      );
    }

    // Deduct balance
    await prisma.user.update({
      where: { id: user.id },
      data: { balance: { decrement: NUMBER_PRICE } },
    });

    // Buy number from Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
    const purchased = await client.incomingPhoneNumbers.create({ phoneNumber });

    // Save purchase
    await prisma.purchasedNumber.create({
      data: {
        phoneNumber: purchased.phoneNumber,
        sid: purchased.sid,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
