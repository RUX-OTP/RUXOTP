import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Number(amount) * 100, // kobo
      }),
    });

    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
  }
}

