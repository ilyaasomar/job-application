"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type CategoryColumn = {
  serialNo: number;
  id: string;
  category_name: string;
  slug: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "serialNo",
    header: "No.",
  },
  {
    accessorKey: "category_name",
    header: "Name",
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        category_name={row.original.category_name}
        slug={row.original.slug}
      />
    ),
  },
];
