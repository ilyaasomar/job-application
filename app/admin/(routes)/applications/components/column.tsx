"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type ApplicationColumn = {
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
};

export const columns: ColumnDef<ApplicationColumn>[] = [
  {
    accessorKey: "serialNo",
    header: "No.",
  },
  {
    accessorKey: "applicant_name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        jobId={row.original.jobId}
        applicantId={row.original.applicantId}
        companyId={row.original.companyId}
        applicant_name={row.original.applicant_name}
        email={row.original.email}
        job_title={row.original.job_title}
        company_name={row.original.company_name}
        resumeUrl={row.original.resumeUrl}
        coverLetter={row.original.coverLetter}
        status={row.original.status}
        notes={row.original.notes}
      />
    ),
  },
];
