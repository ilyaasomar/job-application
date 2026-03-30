"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Role } from "@/app/generated/prisma/enums";
import Actions from "./actions";
import Image from "next/image";
type ApplicantsColumn = {
  serialNo: number;
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: Role;
  avatarUrl: string | null;
  createdAt: string;
};

export const columns: ColumnDef<ApplicantsColumn>[] = [
  {
    accessorKey: "serialNo",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Image
        src={row?.original?.avatarUrl || ""}
        width={40}
        height={40}
        alt="Avatar"
        style={{ width: "40px", height: "auto" }}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Registered Date",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Actions
        id={row.original.id}
        selectedApplicant={{
          id: row.original.id,
          name: row.original.name,
          email: row.original.email,
          password: row.original.password,
          role: row.original.role,
          avatarUrl: row.original.avatarUrl,
          createdAt: row.original.createdAt,
        }}
      />
    ),
  },
];
