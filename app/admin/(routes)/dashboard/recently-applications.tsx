"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { styles } from "@/app/styles";
interface RecentlyAppProps {
  applicant_name: string;
  job_title: string;
  company_name: string;
  status: string;
}
const RecentlyApplications = ({
  applications,
}: {
  applications: RecentlyAppProps[];
}) => {
  const router = useRouter();
  // formatting the status
  const statusFormatter = (status: string) => {
    if (status === "APPLIED") {
      return "Applied";
    }
    if (status === "REVIEWING") {
      return "Reviewing";
    }
    if (status === "OFFERED") {
      return "Offered";
    }
    if (status === "REJECTED") {
      return "Rejected";
    }
    return "Pending";
  };
  const statusColor = (status: string) => {
    if (status === "APPLIED") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (status === "REVIEWING") {
      return "bg-sky-50 text-sky-700 border-sky-200";
    }
    if (status === "OFFERED") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (status === "REJECTED") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-gray-50 text-gray-700 border-gray-200";
  };
  return (
    <Card className="md:col-span-2 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={styles.secondaryColor}>
          Recent Applications
        </CardTitle>
        <Button
          variant="link"
          className={`${styles.primaryColor} cursor-pointer`}
          onClick={() => router.push("/admin/applications")}
        >
          View all
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {applications.map((app, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback
                  className={`${styles.primaryBgColor} text-white font-semibold`}
                >
                  {app.applicant_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className={`font-bold ${styles.secondaryColor}`}>
                  {app.applicant_name}
                </p>
                <p className={`text-sm ${styles.accentColor}`}>
                  Applied for{" "}
                  <span className="font-semibold text-[#0B121A]">
                    {app.job_title}
                  </span>{" "}
                  at {app.company_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className={`rounded-full px-3 ${statusColor(app.status)} `}
              >
                {statusFormatter(app.status)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentlyApplications;
