import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const POST = async (req: NextRequest) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { company_name, logoUrl, description, industry, location } =
    await req.json();

  try {
    // check if the company already exists
    const existCompany = await prisma.company.findFirst({
      where: {
        name: company_name,
      },
    });

    if (existCompany) {
      return NextResponse.json(
        { message: "Company already exists" },
        { status: 400 },
      );
    }
    // create company
    const company = await prisma.company.create({
      data: {
        name: company_name,
        logoUrl,
        description,
        industry,
        location,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Company created successfully!", data: company },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
