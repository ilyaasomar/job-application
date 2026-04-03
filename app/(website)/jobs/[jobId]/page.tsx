"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";
import { Award, CreditCard, Map, Package, SwissFranc } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const JobDetailsPage = ({ params }) => {
  const { jobId } = React.use(params);
  // get data from the API

  console.log(jobId);

  const { data, isFetching } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      return data;
    },
  });

  //   if the minimum salary is greater then 10,000 i need to short it 10k or 100k and add k at the end of it
  const formattedMinimumSalary =
    data?.salaryMin >= 10000
      ? `CHF ${data?.salaryMin / 1000}k`
      : data?.salaryMin >= 1000000
        ? `CHF ${data?.salaryMin / 1000000}M`
        : `CHF ${data?.salaryMin}`;

  const formattedMaximumSalary =
    data?.salaryMax >= 10000
      ? `CHF ${data?.salaryMax / 1000}k`
      : data?.salaryMax >= 1000000
        ? `CHF ${data?.salaryMax / 1000000}M`
        : `CHF ${data?.salaryMax}`;
  return (
    <div className="w-full flex items-start gap-x-6">
      {/* left section */}
      <div className="w-3/4 flex flex-col items-start space-y-5 mt-3">
        {/* top section */}
        <div className="flex items-center justify-center gap-x-3">
          <div className="w-14 h-14 rounded-sm border overflow-hidden">
            <img
              src={data?.company.logoUrl || "/placeholder-logo.png"}
              width={50}
              height={50}
              alt="logo"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">{data?.company.name}</p>
            <h1 className="text-2xl font-bold">{data?.title}</h1>
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col items-start">
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <div className="prose prose-gray max-w-none w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data?.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/4 flex flex-col items-start space-y-5 mt-20 mr-2">
        {/* top section */}
        <Button className={`${styles.primaryBgColor}`}>
          Apply for this job
        </Button>
        <div className="flex flex-col items-start bg-gray-100 w-full rounded-md p-4">
          <h2 className="font-semibold text-lg mb-2">Job Details</h2>
          <div className="flex flex-col items-start space-y-4">
            {/* salary */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm border">
                <CreditCard className="text-[#4191F9] w-6 h-6 mr-1" />
              </div>
              <div className="flex flex-col items-start">
                <p className="font-medium text-sm">Salary Range</p>
                <p className="font-semibold text-sm">
                  {formattedMinimumSalary} - {formattedMaximumSalary}
                </p>
              </div>
            </div>
            {/* location */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm border">
                <Map className="text-[#4191F9] w-6 h-6 mr-1" />
              </div>
              <div className="flex flex-col items-start">
                <p className="font-medium text-sm">Location</p>
                <p className="font-semibold text-sm">{data?.location}</p>
              </div>
            </div>

            {/* job type */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm border">
                <Package className="text-[#4191F9] w-6 h-6 mr-1" />
              </div>
              <div className="flex flex-col items-start">
                <p className="font-medium text-sm">Job Type</p>
                <p className="font-semibold text-sm">
                  {data?.type === "FULL_TIME" ? "Full-time" : "Part-time"}
                </p>
              </div>
            </div>
            {/* experience level */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm border">
                <Award className="text-[#4191F9] w-6 h-6 mr-1" />
              </div>
              <div className="flex flex-col items-start">
                <p className="font-medium text-sm">Experience Level</p>
                <p className="font-semibold text-sm">{data?.experienceLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
