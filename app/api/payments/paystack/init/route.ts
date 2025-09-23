import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { phoneNumber } = body;

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "customer@example.com", // TODO: use session.user.email
        amount: 500 * 100, // Amount in kobo (₦500)
        callback_url: `${process.env.NEXTAUTH_URL}/api/paystack/confirm?phoneNumber=${phoneNumber}`,
      }),
    });

    const data = await response.json();
    if (!data.status) throw new Error(data.message);

    return NextResponse.json({ authorizationUrl: data.data.authorization_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
