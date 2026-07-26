import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { scoreResume } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string; role: string };
    if (decoded.role !== "DEVELOPER") {
      return NextResponse.json(
        { error: "Only developers can score resumes" },
        { status: 403 },
      );
    }

    const { applicationId } = await req.json();

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: true,
        developer: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    if (!application.developer.resumeUrl) {
      return NextResponse.json(
        { error: "Please upload your resume first" },
        { status: 400 },
      );
    }

    const score = await scoreResume(
      application.developer.resumeUrl,
      application.job.description,
      application.job.stack,
    );

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { aiScore: score },
    });

    return NextResponse.json(
      { aiScore: score, application: updated },
      { status: 200 },
    );
  } catch (error) {
    console.error("AI score error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
