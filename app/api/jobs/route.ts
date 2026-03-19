import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: {
          select: {
            name: true,
            description: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Get jobs error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string; role: string };

    if (decoded.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can post jobs" },
        { status: 403 },
      );
    }

    const { title, description, location, stack, salary } = await req.json();

    if (!title || !description || !location || !stack) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const company = await prisma.company.findUnique({
      where: { userId: decoded.userId },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company profile not found" },
        { status: 404 },
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        stack,
        salary,
        companyId: company.id,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
