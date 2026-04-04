import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) => {
  const session = await auth();
  const userId = session?.user?.id;
  const { categoryId } = await params;
  const { category_name } = await request.json();
  try {
    const slug = category_name
      .split(" ")
      .filter((s: string) => s !== "&")
      .join("-")
      .toLowerCase();
    const existCategory = await prisma.category.findUnique({
      where: { id: categoryId, userId: userId },
    });
    if (!existCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }
    // check if category with the same slug already exists
    const check_if_duplicating_with_other_category =
      await prisma.category.findFirst({
        where: { slug, id: { not: categoryId }, userId: userId },
      });
    if (check_if_duplicating_with_other_category) {
      return NextResponse.json(
        { message: "You cannot have duplicate category name" },
        {
          status: 400,
        },
      );
    }
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId, userId: userId },
      data: {
        name: category_name,
        slug,
      },
    });
    return NextResponse.json(
      { message: "Category updated successfully!", category: updatedCategory },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while updating the category." },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  },
) => {
  const { categoryId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  try {
    // check if the category already exists
    const existCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId: userId,
      },
    });
    if (!existCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }
    // delete the category
    const deletedCategory = await prisma.category.deleteMany({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Category deleted successfully!", data: deletedCategory },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
