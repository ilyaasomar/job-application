import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> },
) => {
  const { companyId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const { company_name, logoUrl, description, industry, location } =
    await req.json();
  try {
    // check if the company exists
    const existCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: userId,
      },
    });
    if (!existCompany) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 },
      );
    }
    // update
    const company = await prisma.company.update({
      where: {
        id: companyId,
        userId: userId,
      },
      data: {
        name: company_name,
        logoUrl: logoUrl ? logoUrl : existCompany.logoUrl,
        description,
        industry,
        location,
      },
    });
    return NextResponse.json(
      { message: "Company updated successfully!", data: company },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ companyId: string }>;
  },
) => {
  const { companyId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  try {
    // check if the company already exists
    const existCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
        userId: userId,
      },
    });
    if (!existCompany) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 },
      );
    }
    // delete the company
    const deletedCompany = await prisma.company.deleteMany({
      where: {
        id: companyId,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Company deleted successfully!", data: deletedCompany },
      { status: 200 },
    );
  } catch (error) {}
};
