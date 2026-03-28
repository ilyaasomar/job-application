import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  const userId = session?.user?.id;
  const {
    job_title,
    company_id,
    location,
    experienceLevel,
    type,
    status,
    salaryMin,
    salaryMax,
    description,
  } = await req.json();
  try {
    // check if the job already exists
    // but first i have to change the title to slug
    const job_slug = job_title.replace(/\s+/g, "-").toLowerCase();
    const existJob = await prisma.job.findUnique({
      where: {
        slug: job_slug,
      },
    });

    if (existJob) {
      return NextResponse.json(
        { message: "Job already exists" },
        { status: 400 },
      );
    }
    // create job
    const job = await prisma.job.create({
      data: {
        title: job_title,
        slug: job_slug,
        description: description,
        type: type,
        experienceLevel: experienceLevel,
        status: status,
        location: location,
        salaryMin: salaryMin,
        salaryMax: salaryMax,
        companyId: company_id,
        postedById: userId || "",
      },
    });
    return NextResponse.json(
      {
        message: "Job created successfully!",
        data: job,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
