import React from "react";
import ShowApplicationData from "./components/show-data";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

const ApplicationPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const applications = await prisma.application.findMany({
    include: {
      job: {
        include: {
          company: true,
          category: true,
        },
      },
      applicant: true,
    },
    where: {
      job: {
        postedById: userId,
      },
    },
  });
  // console.log(applications);
  const formattedApplications = applications.map((application, index) => ({
    serialNo: index + 1,
    id: application.id,
    jobId: application.job.id,
    applicantId: application.applicant.id,
    companyId: application.job.company.id,
    applicant_name: application.applicant.name,
    email: application.applicant.email,
    job_title: application.job.title,
    company_name: application.job.company.name,
    resumeUrl: application.resumeUrl,
    coverLetter: application.coverLetter,
    status: application.status,
    notes: application.notes,
  }));
  return (
    <div className="py-4 px-1">
      <ShowApplicationData applications={formattedApplications} />
    </div>
  );
};

export default ApplicationPage;
