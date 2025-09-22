import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { country, code } = await req.json();

    // Twilio Credentials (set in Vercel Environment Variables)
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const client = twilio(accountSid, authToken);

    // Search for available number
    const numbers = await client.availablePhoneNumbers(code).local.list({
      limit: 1,
    });

    if (numbers.length === 0) {
      return NextResponse.json({ error: "No numbers available" }, { status: 404 });
    }

    // Purchase the number
    const purchased = await client.incomingPhoneNumbers.create({
      phoneNumber: numbers[0].phoneNumber,
    });

    return NextResponse.json({ number: purchased.phoneNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to buy number" }, { status: 500 });
  }
}

