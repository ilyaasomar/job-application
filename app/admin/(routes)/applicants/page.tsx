import React from "react";
import ShowApplicantData from "./components/show-data";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

const ApplicantsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  // i fetch only seekers that have applied jobs belongs to the logged in user
  const applicants = await prisma.user.findMany({
    where: {
      role: "SEEKER",
      applications: { some: { job: { postedById: userId } } },
    },
  });
  const formattedApplicants = applicants.map((applicant, index) => {
    const registeredDate = applicant.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return {
      serialNo: index + 1,
      id: applicant.id,
      name: applicant.name,
      email: applicant.email,
      password: applicant.password,
      role: applicant.role,
      avatarUrl: applicant.avatarUrl,
      createdAt: registeredDate,
    };
  });
  return (
    <div className="py-4 px-1">
      <ShowApplicantData applicants={formattedApplicants} />
    </div>
  );
};

export default ApplicantsPage;
