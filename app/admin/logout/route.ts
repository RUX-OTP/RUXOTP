import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the admin_token cookie
  res.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return res;
}
