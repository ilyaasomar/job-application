"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Actions from "./actions";

export type CompanyColumn = {
  serialNo: number;
  id: string;
  company_name: string;
  logoUrl: string | null;
  description: string | null;
  industry: string | null;
  location: string | null;
};

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "serialNo",
    header: "No.",
  },
  {
    accessorKey: "company_name",
    header: "Name",
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => (
      <Image
        src={row?.original?.logoUrl || ""}
        width={30}
        height={30}
        alt="logo"
        style={{ width: "30px", height: "auto" }}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        company_name={row.original.company_name}
        logoUrl={row.original.logoUrl}
        description={row.original.description}
        industry={row.original.industry}
        location={row.original.location}
      />
    ),
  },
];
