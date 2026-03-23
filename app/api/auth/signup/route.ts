import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  try {
    const hashPassword = await bcrypt.hash(body.password, 10);
    const userData = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
        role: body.role,
      },
    });
    if (!userData)
      return NextResponse.json(
        {
          message: "User not created",
        },
        { status: 400 },
      );
    return NextResponse.json(
      { message: "User created successfully!", data: userData },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
