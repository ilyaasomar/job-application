"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

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
];
