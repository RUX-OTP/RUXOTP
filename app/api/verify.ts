// pages/api/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reference } = req.body;

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // add this in .env.local
    },
  });

  const data = await response.json();
  if (data.status && data.data.status === "success") {
    return res.status(200).json({ success: true, data: data.data });
  } else {
    return res.status(400).json({ success: false, error: data.message });
  }
}
