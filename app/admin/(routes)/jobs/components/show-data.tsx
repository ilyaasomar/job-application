"use client";
import { styles } from "@/app/styles";
import { DataTable } from "@/components/admin/reusables/data-table";
import Header from "@/components/admin/reusables/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";
import JobActions from "./job-actions";
interface JobProps {
  serialNo: number;
  id: string;
  job_title: string;
  description: string;
  type: string;
  experienceLevel: string;
  status: string;
  location: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  company_id: string;
  company_name: string;
}
[];

interface CompanyProps {
  id: string;
  name: string;
}
const ShowJobData = ({
  jobs,
  company_data,
}: {
  jobs: JobProps[];
  company_data: CompanyProps[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Jobs" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Job
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <JobActions
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          company_data={company_data}
        />
        <DataTable columns={columns} data={jobs} />
      </div>
    </div>
  );
};

export default ShowJobData;
