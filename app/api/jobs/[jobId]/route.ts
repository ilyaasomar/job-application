import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) => {
  const { jobId } = await params;
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
        category: true,
        applications: true,
      },
    });
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching the job" },
      { status: 500 },
    );
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> },
) => {
  const { jobId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const {
    job_title,
    company_id,
    category_id,
    location,
    experienceLevel,
    type,
    status,
    salaryMin,
    salaryMax,
    description,
  } = await req.json();
  try {
    const job_slug = job_title.replace(/\s+/g, "-").toLowerCase();

    // check if the job already exists
    const job_exisit = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job_exisit) {
      return NextResponse.json(
        { message: "Job not found" },
        {
          status: 404,
        },
      );
    }
    // check if posted job title same as other exist job title to avoid duplicate job title
    const check_if_duplicating_with_other_job = await prisma.job.findFirst({
      where: { title: job_title, NOT: { id: jobId } },
    });
    if (check_if_duplicating_with_other_job) {
      return NextResponse.json(
        { message: "You cannot have duplicate job title" },
        {
          status: 400,
        },
      );
    }
    // update job
    const job = await prisma.job.update({
      where: {
        id: jobId,
      },
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
        categoryId: category_id,
        postedById: userId || "",
      },
    });
    return NextResponse.json({
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while updating the job" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ jobId: string }>;
  },
) => {
  const { jobId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  try {
    // check if the job already exists
    const existJob = await prisma.job.findUnique({
      where: {
        id: jobId,
        postedById: userId,
      },
    });
    if (!existJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    // delete the job
    const deletedJob = await prisma.job.deleteMany({
      where: {
        id: jobId,
        postedById: userId,
      },
    });

    return NextResponse.json(
      { message: "Job deleted successfully!", data: deletedJob },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while deleting the job" },
      { status: 500 },
    );
  }
};
