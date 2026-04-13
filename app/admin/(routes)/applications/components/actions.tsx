"use client";
import React, { useState } from "react";
import { styles } from "@/app/styles";
import DeleteDialog from "@/components/admin/reusables/delete-dialog";
import { useMutation } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
interface ActionProps {
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
}

const Actions = ({ id, ...props }: ActionProps) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const router = useRouter();
  //   delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      router.refresh();
      setOpen(false);
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div>
      {/* delete dialog */}
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => deleteMutation.mutate("id")}
        isLoading={deleteMutation.isPending}
      />
      {/* <CategoryActions
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedCategory={{
          id,
          category_name,
          slug,
        }}
      /> */}

      {/* buttons */}
      {/* <div className="flex items-center gap-x-3">
        <button
          className={`w-8 h-8 ${styles.primaryBgColor} text-white rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className={`w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <div
              className={`w-7 h-7 ${styles.primaryBgColor} text-white rounded-sm flex items-center justify-center cursor-pointer`}
            >
              <Pencil className="h-4 w-4 text-white" />
            </div>
            Edit application
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsViewOpen(true)}>
            <div
              className={`w-7 h-7 ${styles.secondaryBgColor} text-white rounded-sm flex items-center justify-center cursor-pointer`}
            >
              <Eye className="h-4 w-4 text-white" />
            </div>
            View application
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <div
              className={`w-7 h-7 bg-red-600 text-white rounded-sm flex items-center justify-center cursor-pointer`}
            >
              <Trash className="h-4 w-4 text-white" />
            </div>
            Delete application
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Actions;
