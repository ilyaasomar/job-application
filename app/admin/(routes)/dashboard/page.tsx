import React from "react";
import {
  Briefcase,
  Building2,
  Users,
  Plus,
  MoreHorizontal,
  MapPin,
  Clock,
  FileUser,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import StatCard from "./statcards";
import RecentlyApplications from "./recently-applications";
import { styles } from "@/app/styles";
import RegisteredCompanies from "./companies";
import ActiveJobs from "./active-jobs";

export default async function JobBoardDashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  const companies = await prisma.company.findMany({
    where: { userId: userId },
    include: { jobs: true },
  });
  const jobs = await prisma.job.findMany({
    where: { postedById: userId },
    include: { company: true, applications: true },
  });
  const applications = await prisma.application.findMany({
    where: { job: { postedById: userId } },
    include: {
      job: { include: { company: true } },
      applicant: true,
    },
  });

  const applicants = await prisma.user.findMany({
    where: {
      role: "SEEKER",
      applications: { some: { job: { postedById: userId } } },
    },
  });

  const statCardData = [
    {
      title: "Total Companies",
      value: companies.length,
      icon: Building2,
    },
    {
      title: "Active Jobs",
      value: jobs.length,
      icon: Briefcase,
    },
    {
      title: "Applications",
      value: applications.length,
      icon: FileUser,
    },
    {
      title: "Applicants",
      value: applicants.length,
      icon: Users,
    },
  ];
  const recentlyApplications = applications.map((application) => ({
    applicant_name: application.applicant.name,
    job_title: application.job.title,
    company_name: application.job.company.name,
    status: application.status,
  }));

  const companiesData = companies.map((company) => ({
    id: company.id,
    name: company.name,
    industry: company.industry,
    logoUrl: company.logoUrl,
    jobs: company.jobs.length,
  }));

  const activeJobs = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company_name: job.company.name,
    location: job.location,
    type: job.type,
    status: job.status,
    applications: job.applications.length,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    postedAt: job.createdAt,
  }));

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1
            className={`text-3xl font-bold tracking-tight ${styles.secondaryColor}`}
          >
            Dashboard
          </h1>
          <p className={styles.accentColor}>
            Welcome back! Here's an overview of your job board activity.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard data={statCardData} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Applications Section */}
        <RecentlyApplications applications={recentlyApplications} />

        {/* Your Companies Section */}
        <RegisteredCompanies companies={companiesData} />
      </div>

      {/* Active Jobs Section */}
      <ActiveJobs jobs={activeJobs} />
    </div>
  );
}
