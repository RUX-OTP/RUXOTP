import { NextResponse } from "next/server";
import twilio from "twilio";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { phoneNumber } = body;

  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {
    // Purchase number from Twilio
    const purchased = await client.incomingPhoneNumbers.create({
      phoneNumber,
    });

    // Save in DB
    await prisma.purchasedNumber.create({
      data: {
        phoneNumber: purchased.phoneNumber,
        userEmail: session.user.email,
        sid: purchased.sid,
      },
    });

    return NextResponse.json({ message: "Number purchased successfully!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
