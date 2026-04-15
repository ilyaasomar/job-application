"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, MoreHorizontal, Compass } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Footer } from "@/components/footer";

export default function DashboardClientPage({ applications }: any) {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  const queryClient = useQueryClient();

  const appliedJobs = applications.length;
  const pendingJobs = applications.filter(
    (application: any) =>
      application.status === "REVIEWING" || application.status === "APPLIED",
  );
  const acceptedJobs = applications.filter(
    (application: any) => application.status === "OFFERED",
  );

  const statusColor = (status: string) => {
    if (status === "REVIEWING" || status === "APPLIED") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    } else if (status === "OFFERED") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (status === "REJECTED") {
      return "bg-red-50 text-red-600 border-red-200";
    }
  };

  //   withdraw mutation
  const withdrawMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });
  //   withdraw application
  const withdrawApplication = (applicationId: string) => {
    withdrawMutation.mutate(applicationId);
  };
  return (
    <>
      <div className="min-h-screen bg-slate-50 mb-10">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Profile */}
            <div className="w-full lg:w-80 shrink-0">
              <Card className="py-8">
                <CardContent className="flex flex-col items-center text-center">
                  {/* Profile Avatar with Online Indicator */}
                  <div className="relative mb-4">
                    <Avatar className="w-28 h-28">
                      <AvatarImage
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/application-dashboard-screen-bkU4V2qiLEqZXw3wPiomWUvZuYZSjC.png"
                        alt="Julian Archi-tect"
                      />
                      <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">
                        JA
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <h2 className="text-xl font-semibold text-slate-900 mb-1">
                    {user?.name}
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">{user?.email}</p>

                  {/* Stats */}
                  <div className="flex justify-center gap-8 w-full mb-6">
                    <div className="text-center">
                      <p className="text-xl font-semibold text-blue-600">
                        {appliedJobs}
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Applied
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-slate-900">
                        {pendingJobs.length}
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Pending
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-blue-600">
                        {acceptedJobs.length}
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Accepted
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content - Applications */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    My Applications
                  </h1>
                  <p className="text-slate-500">
                    Manage and track your active professional journeys.
                  </p>
                </div>
              </div>

              {/* Applications Table */}
              <Card className="mb-6 py-0 overflow-hidden">
                <CardContent className="p-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_140px_120px_40px] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Job Title & Company
                    </span>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Date Applied
                    </span>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </span>
                    <span></span>
                  </div>

                  {/* Table Rows */}
                  {applications.map((app: any) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-[1fr_140px_120px_40px] gap-4 px-6 py-4 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {app.job.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            {app.job.company.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-slate-600">
                        {new Date(app.appliedAt).toLocaleDateString() ||
                          app.appliedAt}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border w-fit ${statusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/jobs/${app.jobId}`)}
                            disabled={withdrawMutation.isPending}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => withdrawApplication(app.id)}
                            disabled={withdrawMutation.isPending}
                          >
                            Withdraw Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Portfolio Review Banner */}
              {/* <div className="relative bg-blue-600 rounded-xl p-8 overflow-hidden">
                <div className="absolute right-4 bottom-4 opacity-20">
                  <Compass className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Ready to level up your portfolio?
                  </h3>
                  <p className="text-blue-100 mb-6 max-w-lg">
                    Our design curators can help you refine your presentation to
                    match the standards of world-class firms.
                  </p>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Get a Portfolio Review
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
