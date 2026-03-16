import { NextResponse, NextRequest } from "next/server";
import { comparePassword, createToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 },
    );
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }
  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }
  const token = createToken(user.id, user.role);
  const response = NextResponse.json(
    { message: "Login successful", token },
    { status: 200 },
  );
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",

    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
