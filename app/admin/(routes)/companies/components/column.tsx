"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CompanyColumn = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  industry: string;
  location: string;
};

export const columns: ColumnDef<CompanyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
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
