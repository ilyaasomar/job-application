import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { category_name } = await request.json();
  try {
    // generate slug from category name by replacing spaces with hyphens and converting to lowercase
    const slug = category_name
      .split(" ")
      .filter((s: string) => s !== "&")
      .join("-")
      .toLowerCase();

    // check if category with the same slug already exists
    const existCategory = await prisma.category.findUnique({
      where: { slug },
    });
    if (existCategory) {
      return NextResponse.json(
        { message: "Category with this name already exists" },
        { status: 400 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name: category_name,
        slug,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Category created successfully!", category },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
};
