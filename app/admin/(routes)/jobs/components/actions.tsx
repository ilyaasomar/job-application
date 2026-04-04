"use client";
import { styles } from "@/app/styles";
import DeleteDialog from "@/components/admin/reusables/delete-dialog";
import { useMutation } from "@tanstack/react-query";
import { Eye, List, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import JobActions from "./job-actions";
import { set } from "zod";
import { ShowJobDialog } from "./show-data-dialog";
interface ActionProps {
  id: string;
  selectedJob: {
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
    category_id: string | undefined;
    category_name: string | undefined;
    categories_data:
      | {
          id: string;
          name: string;
          slug: string;
        }[]
      | null;
  };
}

const Actions = ({ id, selectedJob }: ActionProps) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const router = useRouter();
  //   delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/jobs/${id}`, {
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
      {/* view dialog */}

      <ShowJobDialog
        open={isViewOpen}
        setOpen={setIsViewOpen}
        main_title="Job Details"
        description="View job details"
        selectedJob={{
          id: selectedJob.id,
          job_title: selectedJob.job_title,
          company_id: selectedJob.company_id,
          company_name: selectedJob.company_name,
          category_id: selectedJob.category_id,
          category_name: selectedJob.category_name,
          location: selectedJob.location,
          type: selectedJob.type,
          experienceLevel: selectedJob.experienceLevel,
          status: selectedJob.status,
          salaryMin: selectedJob.salaryMin,
          salaryMax: selectedJob.salaryMax,
          description: selectedJob.description,
        }}
      />

      {/* delete dialog */}
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => deleteMutation.mutate(id)}
        isLoading={deleteMutation.isPending}
      />
      <JobActions
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedJob={{
          id: selectedJob.id,
          job_title: selectedJob.job_title,
          description: selectedJob.description,
          type: selectedJob.type,
          experienceLevel: selectedJob.experienceLevel,
          status: selectedJob.status,
          location: selectedJob.location,
          salaryMin: selectedJob.salaryMin,
          salaryMax: selectedJob.salaryMax,
          company_id: selectedJob.company_id,
          companies_data: selectedJob?.companies_data,
          category_id: selectedJob.category_id,
          categories_data: selectedJob?.categories_data,
        }}
      />

      {/* buttons */}
      <div className="flex items-center gap-x-3">
        <button
          className={`w-8 h-8 ${styles.secondaryBgColor} text-white rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setIsViewOpen(true)}
        >
          <Eye className="w-4 h-4" />
        </button>
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
      </div>
    </div>
  );
};

export default Actions;
