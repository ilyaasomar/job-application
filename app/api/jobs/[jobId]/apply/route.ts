import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { jobId, applicantId, resumeUrl, coverLetter, notes } =
    await req.json();
  console.log(jobId, applicantId, resumeUrl, coverLetter, notes);
  try {
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
