import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { jobId, applicantId, resumeUrl, coverLetter, notes } =
    await req.json();
  try {
    // check if the application already exists
    const existApplication = await prisma.application.findFirst({
      where: { jobId: jobId, applicantId: applicantId },
    });
    if (existApplication) {
      return NextResponse.json(
        { message: "Application already exists" },
        { status: 400 },
      );
    }

    const application = await prisma.application.create({
      data: {
        jobId: jobId,
        applicantId: applicantId,
        resumeUrl: resumeUrl,
        coverLetter: coverLetter,
        notes: notes,
      },
    });
    return NextResponse.json(
      { message: "Application submitted successfully!", data: application },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};
