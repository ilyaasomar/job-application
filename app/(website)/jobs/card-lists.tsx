import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { formatter } from "@/lib/utils";
const JobCardsList = ({ jobs, loading }: { jobs: any[]; loading: boolean }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        jobs &&
        jobs.map((job) => (
          <Card key={job.id} className="p-6 w-full flex flex-col gap-y-2 ">
            {/* company logo */}
            <div className="w-14 h-14 rounded-sm border overflow-hidden">
              <img
                src={job.company.logoUrl || "/placeholder-logo.png"}
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
                {job.type === "FULL_TIME"
                  ? "Full-time"
                  : job.type === "PART_TIME"
                    ? "Part-time"
                    : job.type}
              </Badge>
              <Badge variant="default" className="mr-2">
                {job.location}
              </Badge>
              <Badge variant="default" className="mr-2">
                {job.experienceLevel === "JUNIOR"
                  ? "Junior"
                  : job.experienceLevel === "MID"
                    ? "Mid"
                    : job.experienceLevel === "SENIOR"
                      ? "Senior"
                      : job.experienceLevel}
              </Badge>
            </div>
            {/* salary */}
            <div className="flex items-center justify-between mt-4">
              <h3 className="font-semibold text-md">
                {formatter.format(job.salaryMin)} -{" "}
                {formatter.format(job.salaryMax)}
              </h3>
              <Link
                href={`/jobs/${job.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default JobCardsList;
