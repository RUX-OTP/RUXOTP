// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { verifyPassword, signJwt } from "../../../src/lib/auth";

type ReqBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReqBody;
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = signJwt({ sub: user.id, email: user.email, role: user.role });

    // return minimal user info
    const userSafe = { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };

    return NextResponse.json({ ok: true, message: "Login successful", token, user: userSafe });
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
  }
      }
