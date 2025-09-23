// lib/requireAdmin.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return user;
}
