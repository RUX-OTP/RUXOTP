// pages/api/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // your prisma.ts file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { reference, userId } = req.body;
  if (!reference || !userId) return res.status(400).json({ error: "Missing fields" });

  try {
    // 1. Verify with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      const amount = data.data.amount; // already in kobo

      // 2. Update user's wallet
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          wallet: { increment: amount }, // add payment to wallet
        },
      });

      return res.status(200).json({ success: true, wallet: user.wallet });
    } else {
      return res.status(400).json({ success: false, error: data.message });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
