"use client";
import { styles } from "@/app/styles";
import { DataTable } from "@/components/admin/reusables/data-table";
import Header from "@/components/admin/reusables/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";

interface ShowApplicationDataProps {
  applications: {
    serialNo: number;
    id: string;
    jobId: string;
    applicantId: string;
    companyId: string;
    applicant_name: string;
    email: string;
    job_title: string;
    company_name: string;
    resumeUrl: string;
    coverLetter: string | null;
    status: string;
    notes: string | null;
  }[];
}

const ShowApplicationData = ({ applications }: ShowApplicationDataProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Applications" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Application
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        {/* <CategoryActions isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        <DataTable columns={columns} data={applications} />
      </div>
    </div>
  );
};

export default ShowApplicationData;
