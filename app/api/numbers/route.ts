import { NextResponse } from "next/server";
import twilio from "twilio";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "NG";

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {
    const numbers = await client.availablePhoneNumbers(country).local.list({
      limit: 5,
    });

    return NextResponse.json({ numbers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
