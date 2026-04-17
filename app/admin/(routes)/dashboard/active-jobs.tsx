import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, MoreHorizontal, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActiveJobProps {
  title: string;
  company_name: string;
  location: string | null;
  type: string;
  status: string;
  applications: number;
  salaryMin: number | null;
  salaryMax: number | null;
  postedAt: Date;
}
const ActiveJobs = ({ jobs }: { jobs: ActiveJobProps[] }) => {
  const salaryFormatter = (salary: number | null) => {
    if (salary === null) return "—";
    if (salary >= 1000000) return `CHF ${(salary / 1000000).toFixed(1)}M`;
    if (salary >= 1000) return `CHF ${(salary / 1000).toFixed(2)}K`;
    return `CHF ${salary}`;
  };

  // change postedAt to relative time

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Active Jobs</h2>
        <Button variant="link" className="text-blue-600">
          View all
        </Button>
      </div>
      <div className="grid gap-4">
        {jobs.map((job, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <Badge
                    className={
                      job.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {job.status === "ACTIVE" ? "Active" : "Closed"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {job.company_name}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />{" "}
                    {job.type === "FULL_TIME" ? "Full-time" : "Part-time"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {job.applications}{" "}
                    applicants
                  </span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="font-bold text-lg">
                  {salaryFormatter(job?.salaryMin)} -{" "}
                  {salaryFormatter(job?.salaryMax)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveJobs;
