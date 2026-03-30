import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password, avatarUrl, role } = await request.json();
  try {
    // check if user with the same email already exists
    const existUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatarUrl,
        role,
      },
    });
    return NextResponse.json({
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: (error as Error).message },
      { status: 500 },
    );
  }
};
