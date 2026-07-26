import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { sendApplicationEmail, sendStatusUpdateEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string; role: string };

    if (decoded.role !== "DEVELOPER") {
      return NextResponse.json(
        { error: "Only developers can apply" },
        { status: 403 },
      );
    }

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ error: "Job ID required" }, { status: 400 });
    }

    const developer = await prisma.developer.findUnique({
      where: { userId: decoded.userId },
      include: { user: { select: { email: true } } },
    });

    if (!developer) {
      return NextResponse.json(
        { error: "Developer profile not found" },
        { status: 404 },
      );
    }

    const existingApplication = await prisma.application.findFirst({
      where: { jobId, developerId: developer.id },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "Already applied to this job" },
        { status: 400 },
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: { select: { name: true } } },
    });

    const application = await prisma.application.create({
      data: {
        jobId,
        developerId: developer.id,
        status: "PENDING",
      },
    });

    // send confirmation email to developer
    if (job && developer.user?.email) {
      try {
        await sendApplicationEmail(
          developer.user.email,
          developer.name,
          job.title,
          job.company.name,
        );
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string; role: string };

    if (decoded.role === "DEVELOPER") {
      const developer = await prisma.developer.findUnique({
        where: { userId: decoded.userId },
      });

      if (!developer) {
        return NextResponse.json(
          { error: "Developer profile not found" },
          { status: 404 },
        );
      }

      const applications = await prisma.application.findMany({
        where: { developerId: developer.id },
        include: {
          job: {
            include: {
              company: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ applications }, { status: 200 });
    }

    if (decoded.role === "COMPANY") {
      const company = await prisma.company.findUnique({
        where: { userId: decoded.userId },
      });

      if (!company) {
        return NextResponse.json(
          { error: "Company profile not found" },
          { status: 404 },
        );
      }

      const applications = await prisma.application.findMany({
        where: { job: { companyId: company.id } },
        include: {
          developer: {
            select: {
              name: true,
              skills: true,
              resumeUrl: true,
            },
          },
          job: { select: { title: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ applications }, { status: 200 });
    }
  } catch (error) {
    console.error("Get applications error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token) as { userId: string; role: string };
    if (decoded.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Only companies can update status" },
        { status: 403 },
      );
    }
    const { applicationId, status } = await req.json();

    const application = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: {
        developer: {
          include: { user: { select: { email: true } } },
        },
        job: { select: { title: true } },
      },
    });

    // send status update email to developer
    if (application.developer.user?.email) {
      try {
        await sendStatusUpdateEmail(
          application.developer.user.email,
          application.developer.name,
          application.job.title,
          status,
        );
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
