import { NextRequest, NextResponse } from "next/server";
import { hashPassword, createToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { name, email, password, role } = await request.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 },
    );
  }
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,

      role: role as "DEVELOPER" | "COMPANY",
    },
  });
  if (role === "DEVELOPER") {
    await prisma.developer.create({
      data: {
        name,
        userId: user.id,
        skills: [],
      },
    });
  }

  if (role === "COMPANY") {
    await prisma.company.create({
      data: {
        name,
        userId: user.id,
      },
    });
  }
  const token = createToken(user.id, user.role);
  const response = NextResponse.json(
    { message: "User created successfully", token },
    { status: 201 },
  );
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
