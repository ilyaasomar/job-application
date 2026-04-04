import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  // these names must match what you sent in the URL
  const search = searchParams.get("search"); // filteredJobs.searchedTerm
  const category = searchParams.get("category"); // "1,3,5"
  const levels = searchParams.get("level"); // "junior"

  let level =
    levels === "junior"
      ? "JUNIOR"
      : levels === "mid"
        ? "MID"
        : levels === "senior"
          ? "SENIOR"
          : "";

  try {
    const categories = category ? category.split(",") : undefined;
    // check if the filter exisit

    const jobs = await prisma.job.findMany({
      where: {
        title: {
          contains: search || undefined,
          mode: "insensitive",
        },
        categoryId: {
          in: categories,
        },
        experienceLevel: {
          equals: (level as "JUNIOR" | "MID" | "SENIOR") || null || undefined,
        },
      },
      include: {
        company: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
export const POST = async (req: NextRequest) => {
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
        categoryId: category_id,
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
