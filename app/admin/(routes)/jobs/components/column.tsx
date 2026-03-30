"use client";

import { styles } from "@/app/styles";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";
import { Company } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
type JobsColumn = {
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
  companies_data:
    | {
        id: string;
        name: string;
      }[]
    | null;
};

export const columns: ColumnDef<JobsColumn>[] = [
  {
    accessorKey: "serialNo",
    header: "No.",
  },
  {
    accessorKey: "job_title",
    // header: "Title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "company_name",
    header: "Company",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      if (row.original.type === "FULL_TIME") {
        return <Badge className={`${styles.primaryBgColor}`}>Full Time</Badge>;
      } else {
        return <Badge className={`${styles.accentBgColor}`}>Part Time</Badge>;
      }
    },
  },
  {
    accessorKey: "experienceLevel",
    header: "Experience Level",
  },
  {
    accessorKey: "location",
    header: "location",
  },
  // {
  //   accessorKey: "salaryMin",
  //   header: "Min Salary",
  //   cell: ({ row }) =>
  //     row.original.salaryMin != null
  //       ? formatter.format(row.original.salaryMin)
  //       : "—",
  // },
  // {
  //   accessorKey: "salaryMax",
  //   header: "Max Salary",
  //   cell: ({ row }) =>
  //     row.original.salaryMax != null
  //       ? formatter.format(row.original.salaryMax)
  //       : "—",
  // },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        selectedJob={{
          id: row.original.id,
          job_title: row.original.job_title,
          description: row.original.description,
          type: row.original.type,
          experienceLevel: row.original.experienceLevel,
          status: row.original.status,
          location: row.original.location,
          salaryMin: row.original.salaryMin,
          salaryMax: row.original.salaryMax,
          company_id: row.original.company_id,
          companies_data: row.original.companies_data,
        }}
      />
    ),
  },
];
