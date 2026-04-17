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
  const { name, email, oldPassword, password, avatarUrl, role } =
    await request.json();

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
    if (avatarUrl && avatarUrl !== existUser.image) {
      const oldImageKey = existUser?.image?.split("/f/")[1];

      // Only delete if it's actually an uploadthing image
      if (oldImageKey) {
        await utapi.deleteFiles(oldImageKey);
      }
    }
    // check if the old password is correct
    if (oldPassword) {
      const isOldPasswordCorrect = await bcrypt.compare(
        oldPassword,
        existUser?.password as string,
      );
      if (!isOldPasswordCorrect) {
        return NextResponse.json(
          { message: "Incorrect Old password incorrect" },
          { status: 400 },
        );
      }
    }

    const hashedPassword =
      password && password.length > 0
        ? await bcrypt.hash(password, 10)
        : existUser.password; // ← keep existing if not sent

    const user = await prisma.user.update({
      where: { id: applicantId },
      data: {
        // i only update fields that were actually sent
        ...(name && { name }),
        ...(email && { email }),
        ...(avatarUrl && { image: avatarUrl }),
        ...(role && { role }),
        ...(password && password.length > 0 && { password: hashedPassword }),
      },
    });
    return NextResponse.json({
      message: "User data updated successfully!",
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
