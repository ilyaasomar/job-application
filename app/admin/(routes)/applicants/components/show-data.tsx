"use client";
import { Role } from "@/app/generated/prisma/enums";
import { styles } from "@/app/styles";
import { DataTable } from "@/components/admin/reusables/data-table";
import Header from "@/components/admin/reusables/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";
import ApplicantActions from "./applicant-actions";
interface ApplicantsProps {
  serialNo: number;
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: Role;
  avatarUrl: string | null;
  createdAt: string;
}
[];
const ShowApplicantData = ({
  applicants,
}: {
  applicants: ApplicantsProps[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Applicants" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Applicant
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <ApplicantActions isOpen={isOpen} setIsOpen={setIsOpen} />
        <DataTable columns={columns} data={applicants} />
      </div>
    </div>
  );
};

export default ShowApplicantData;
