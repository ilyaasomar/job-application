import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();
export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> },
) => {
  const { applicationId } = await params;
  try {
    // check if the application already exists
    const existApplication = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!existApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 },
      );
    }
    // extract the files[resume & coverLetter] key from the url
    const resumeKey = existApplication.resumeUrl.split("/f/")[1];
    const coverLetterKey = existApplication.coverLetter?.split("/f/")[1];
    const keysToDelete = [resumeKey, coverLetterKey].filter(
      Boolean,
    ) as string[];
    await utapi.deleteFiles(keysToDelete);

    // delete the application
    const deletedApplication = await prisma.application.delete({
      where: { id: applicationId },
    });
    return NextResponse.json({
      message: "Application deleted successfully!",
      data: deletedApplication,
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      {
        message: "Failed to delete application",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
