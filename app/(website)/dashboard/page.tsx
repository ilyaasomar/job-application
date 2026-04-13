import React from "react";
import DashboardClientPage from "./dashboard-client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const DashboardPage = async () => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;
  const applications = await prisma.application.findMany({
    where: {
      applicantId: userId,
    },
    include: {
      job: {
        include: {
          company: true,
          category: true,
        },
      },
    },
  });
  return (
    <div className="w-full">
      <DashboardClientPage applications={applications} />
    </div>
  );
};

export default DashboardPage;
