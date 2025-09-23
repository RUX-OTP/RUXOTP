import { NextResponse } from "next/server";
import twilio from "twilio";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const phoneNumber = searchParams.get("phoneNumber");

  if (!reference || !phoneNumber) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  try {
    // Verify transaction
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({ error: "Payment not successful" }, { status: 400 });
    }

    // Buy from Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
    const purchased = await client.incomingPhoneNumbers.create({ phoneNumber });

    // Save to DB
    await prisma.purchasedNumber.create({
      data: {
        phoneNumber: purchased.phoneNumber,
        sid: purchased.sid,
        userEmail: verifyData.data.customer.email,
      },
    });

    // Redirect user back to dashboard
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?success=1`);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
