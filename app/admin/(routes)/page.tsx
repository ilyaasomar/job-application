import React from "react";
import {
  Briefcase,
  Building2,
  Users,
  FileText,
  Plus,
  MoreHorizontal,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Your custom brand styles
export const styles = {
  primaryBgColor: "bg-[#0559D2]",
  secondaryBgColor: "bg-[#0B121A]",
  accentBgColor: "bg-[#6B7280]",
  primaryColor: "text-[#0559D2]",
  secondaryColor: "text-[#0B121A]",
  accentColor: "text-[#6B7280]",
};

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendType: "up" | "down";
  icon: React.ElementType;
}

export default function JobBoardDashboard() {
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
        <StatCard
          title="Total Companies"
          value="12"
          trend="+2 this month"
          trendType="up"
          icon={Building2}
        />
        <StatCard
          title="Active Jobs"
          value="24"
          trend="+5 this month"
          trendType="up"
          icon={Briefcase}
        />
        <StatCard
          title="Applications"
          value="156"
          trend="+23 this month"
          trendType="up"
          icon={FileText}
        />
        <StatCard
          title="Total Applicants"
          value="89"
          trend="-3 this month"
          trendType="down"
          icon={Users}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Applications Section */}
        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className={styles.secondaryColor}>
              Recent Applications
            </CardTitle>
            <Button variant="link" className={styles.primaryColor}>
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                time: "2 hours ago",
                status: "Reviewing",
                statusColor: "bg-slate-100 text-slate-700",
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                company: "InnovateCo",
                time: "5 hours ago",
                status: "Interview",
                statusColor: "bg-blue-50 text-[#0559D2]",
              },
              {
                name: "Emily Davis",
                role: "UX Designer",
                company: "DesignHub",
                time: "1 day ago",
                status: "Applied",
                statusColor: "bg-slate-100 text-slate-700",
              },
              {
                name: "James Wilson",
                role: "Backend Engineer",
                company: "TechCorp Inc.",
                time: "2 days ago",
                status: "Offered",
                statusColor: "bg-green-50 text-green-700",
              },
              {
                name: "Lisa Anderson",
                role: "Marketing Specialist",
                company: "GrowthLabs",
                time: "3 days ago",
                status: "Rejected",
                statusColor: "bg-red-50 text-red-700",
              },
            ].map((app, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback
                      className={`${styles.primaryBgColor} text-white font-semibold`}
                    >
                      {app.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={`font-bold ${styles.secondaryColor}`}>
                      {app.name}
                    </p>
                    <p className={`text-sm ${styles.accentColor}`}>
                      Applied for{" "}
                      <span className="font-semibold text-[#0B121A]">
                        {app.role}
                      </span>{" "}
                      at {app.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs ${styles.accentColor}`}>
                    {app.time}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`rounded-full px-3 ${app.statusColor}`}
                  >
                    {app.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={styles.accentColor}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Companies Section */}
        <Card className="h-fit border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className={`text-lg ${styles.secondaryColor}`}>
              Your Companies
            </CardTitle>
            <Button
              size="sm"
              className={`${styles.primaryBgColor} hover:opacity-90 transition-opacity`}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Company
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            {["TechCorp Inc.", "InnovateCo", "DesignHub", "GrowthLabs"].map(
              (company, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 border rounded-xl bg-white hover:border-[#0559D2] transition-colors cursor-pointer group"
                >
                  <div
                    className={`p-2 rounded-lg font-bold text-xs ${styles.primaryBgColor} text-white`}
                  >
                    {company.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-bold leading-none ${styles.secondaryColor}`}
                    >
                      {company}
                    </p>
                    <p
                      className={`text-xs flex items-center gap-1 ${styles.accentColor}`}
                    >
                      <Building2 className="h-3 w-3" /> Software & Tech
                    </p>
                    <p
                      className={`text-xs font-bold underline ${styles.primaryColor}`}
                    >
                      {Math.floor(Math.random() * 8) + 2} active jobs
                    </p>
                  </div>
                </div>
              ),
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Active Jobs</h2>
          <Button variant="link" className="text-blue-600">
            View all
          </Button>
        </div>
        <div className="grid gap-4">
          {[
            {
              title: "Senior Frontend Developer",
              company: "TechCorp Inc.",
              loc: "San Francisco, CA",
              type: "Full-time",
              apps: 23,
              pay: "$120k - $150k",
              posted: "3 days ago",
              status: "Active",
            },
            {
              title: "Product Manager",
              company: "InnovateCo",
              loc: "New York, NY",
              type: "Full-time",
              apps: 45,
              pay: "$100k - $130k",
              posted: "1 week ago",
              status: "Active",
            },
            {
              title: "UX Designer",
              company: "DesignHub",
              loc: "Remote",
              type: "Part-time",
              apps: 18,
              pay: "$80k - $100k",
              posted: "2 weeks ago",
              status: "Active",
            },
            {
              title: "Backend Engineer",
              company: "TechCorp Inc.",
              loc: "Austin, TX",
              type: "Full-time",
              apps: 67,
              pay: "$110k - $140k",
              posted: "1 month ago",
              status: "Closed",
            },
          ].map((job, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <Badge
                      className={
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{job.company}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {job.loc}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {job.apps} applicants
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-lg">{job.pay}</p>
                  <p className="text-sm text-muted-foreground">{job.posted}</p>
                  <Button variant="ghost" size="sm" className="px-0">
                    <MoreHorizontal />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  trendType,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div className="space-y-1">
          <p className={`text-sm font-semibold ${styles.accentColor}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${styles.secondaryColor}`}>
            {value}
          </p>
          <p
            className={`text-xs font-bold flex items-center gap-1 ${trendType === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trendType === "up" ? "▲" : "▼"} {trend}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-blue-50 ${styles.primaryColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
