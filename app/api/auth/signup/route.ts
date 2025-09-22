// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";
import { hashPassword, signJwt } from "../../../src/lib/auth";

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
    if (password.length < 6) {
      return NextResponse.json({ ok: false, message: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check existing
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, message: "Email already registered" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    // Sign token
    const token = signJwt({ sub: user.id, email: user.email, role: user.role });

    return NextResponse.json({ ok: true, message: "Signup successful", token, user });
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
  }
                                }
