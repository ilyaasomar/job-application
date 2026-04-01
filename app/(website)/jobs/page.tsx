import React from "react";
import JobSidebar from "./job-sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
const jobs = [
  {
    id: 1,
    title: "Senior Developer",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur accusamus quasi suscipit saepe. Tenetur explicabo ullam praesentium reprehenderit earum veniam, eaque officiis optio aspernatur accusantium eveniet tempora amet quasi consectetur.",
    type: "Full-time",
    experienceLevel: "Senior",
    status: "Active",
    location: "Remote",
    salaryMin: 50000,
    salaryMax: 80000,
    company_id: "1",
    companies_data: [
      {
        id: "1",
        name: "Google",
      },
    ],
  },
  {
    id: 2,
    title: "Mid-level Developer",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur accusamus quasi suscipit saepe. Tenetur explicabo ullam praesentium reprehenderit earum veniam, eaque officiis optio aspernatur accusantium eveniet tempora amet quasi consectetur.",
    type: "Full-time",
    experienceLevel: "Mid-level",
    status: "Active",
    location: "Remote",
    salaryMin: 40000,
    salaryMax: 60000,
    company_id: "1",
    companies_data: [
      {
        id: "1",
        name: "Google",
      },
    ],
  },
  {
    id: 3,
    title: "Junior Developer",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur accusamus quasi suscipit saepe. Tenetur explicabo ullam praesentium reprehenderit earum veniam, eaque officiis optio aspernatur accusantium eveniet tempora amet quasi consectetur.",
    type: "Full-time",
    experienceLevel: "Junior",
    status: "Active",
    location: "Remote",
    salaryMin: 30000,
    salaryMax: 50000,
    company_id: "1",
    companies_data: [
      {
        id: "1",
        name: "Google",
      },
    ],
  },
];

const JobsPage = () => {
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      <p>Show 110 available jobs</p>

      {/* job cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6 w-full flex flex-col gap-y-2 ">
            {/* company logo */}
            <div className="w-14 h-14 rounded-sm border overflow-hidden">
              <img
                src="/images/logo-icon.svg"
                width={50}
                height={50}
                alt="logo"
              />
            </div>

            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p>
              {job.description.length > 300
                ? job.description.slice(0, 300) + "...."
                : job.description}
            </p>
            {/* badges */}
            <div className="flex items-center gap-x-2 my-2">
              <Badge variant="default" className="mr-2">
                {job.type}
              </Badge>
              <Badge variant="default" className="mr-2">
                {job.location}
              </Badge>
              <Badge variant="default" className="mr-2">
                {job.experienceLevel}
              </Badge>
            </div>
            {/* salary */}
            <div className="flex items-center justify-between mt-4">
              <h3 className="font-semibold">
                CHF {job.salaryMin.toLocaleString()} - CHF{" "}
                {job.salaryMax.toLocaleString()}
              </h3>
              <Link
                href={`/jobs/${job.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
