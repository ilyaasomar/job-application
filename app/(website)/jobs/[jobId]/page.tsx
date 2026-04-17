"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";
import {
  ArrowLeft,
  ArrowUpRightFromSquareIcon,
  Award,
  CreditCard,
  Layers2,
  Map,
  Package,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spinner } from "@/components/ui/spinner";
import { SpinnerCustom } from "@/components/admin/reusables/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const JobDetailsPage = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const { jobId } = React.use(params);
  const session = useSession();
  const router = useRouter();
  // get data from the API
  const { data, isFetching } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      return data;
    },
  });
  const applicantId = data?.applications[0]?.applicantId ?? "";

  //   if the minimum salary is greater then 10,000 i need to short it 10k or 100k and add k at the end of it
  const formatSalary = (amount: number | undefined) => {
    if (!amount) return "N/A";
    if (amount >= 1000000) return `CHF ${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `CHF ${(amount / 1000).toFixed(2)}K`;
    return `CHF ${amount}`;
  };

  const formattedMinimumSalary = formatSalary(data?.salaryMin);
  const formattedMaximumSalary = formatSalary(data?.salaryMax);

  // handle apply
  const handleApply = () => {
    if (session.status === "unauthenticated") {
      router.push("/auth/sign-in");
    } else {
      router.push(`/jobs/${jobId}/apply`);
    }
  };

  if (isFetching) {
    return <SpinnerCustom />;
  }
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

      <div className="w-1/4 flex flex-col">
        <Button
          className={`self-end ${styles.primaryBgColor} hover:${styles.primaryBgColor} w-32 text-white py-5 rounded-sm cursor-pointer mr-0 bg`}
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
          Back to jobs
        </Button>
        <div className="flex flex-col items-start space-y-5 mt-20 mr-2">
          {/* top section */}
          <div className="flex justify-end items-center space-x-4 w-full">
            <Button
              className={`${styles.primaryBgColor} hover:${styles.primaryBgColor} text-white py-5 rounded-sm cursor-pointer`}
              disabled={session.data?.user?.id === applicantId}
              onClick={handleApply}
            >
              {session.status === "authenticated" ? (
                session.data.user?.id === applicantId ? (
                  <p>You're already applied</p>
                ) : (
                  <p>Apply Now</p>
                )
              ) : (
                <p>Sign in to apply</p>
              )}
            </Button>
          </div>
          <div className="flex flex-col items-start bg-gray-100 w-full rounded-md p-4">
            <h2 className="font-semibold text-lg mb-2">Job Details</h2>
            <div className="flex flex-col items-start space-y-4 py-6">
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

              {/* category */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm border">
                  <Layers2 className="text-[#4191F9] w-6 h-6 mr-1" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-medium text-sm">Category</p>
                  <p className="font-semibold text-sm">{data?.category.name}</p>
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
                  <p className="font-semibold text-sm">
                    {data?.experienceLevel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
