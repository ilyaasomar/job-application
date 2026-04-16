import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();
export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ applicantId: string }> },
) => {
  const { applicantId } = await params;
  const { name, email, password, avatarUrl, role } = await request.json();

  console.log(avatarUrl);
  try {
    // check if user exists
    const existUser = await prisma.user.findUnique({
      where: { id: applicantId },
    });
    if (!existUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 },
      );
    }
    // check if the posted image and stored image are same or not
    if (avatarUrl !== existUser.image) {
      // delete the image from uploadthing
      const oldImageKey = existUser?.image?.split("/f/")[1];
      await utapi.deleteFiles(oldImageKey as string);
    }
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : existUser.password; // if password is provided, hash it, otherwise keep existing password
    const user = await prisma.user.update({
      where: { id: applicantId },
      data: {
        name,
        email,
        password: hashedPassword,
        image: avatarUrl,
        role,
      },
    });
    return NextResponse.json({
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user", error: (error as Error).message },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: Promise<{ applicantId: string }> },
) => {
  const { applicantId } = await params;
  try {
    // check if user exists
    const existUser = await prisma.user.findUnique({
      where: { id: applicantId },
    });
    if (!existUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 },
      );
    }
    const user = await prisma.user.delete({
      where: { id: applicantId },
    });
    return NextResponse.json({
      message: "User deleted successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error: (error as Error).message },
      { status: 500 },
    );
  }
};
