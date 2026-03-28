"use client";
import { styles } from "@/app/styles";
import DeleteDialog from "@/components/admin/reusables/delete-dialog";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import JobActions from "./job-actions";
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
    companies_data: any;
  };
}

const Actions = ({ id, selectedJob }: ActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  //   delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/companies/${id}`, {
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
        onConfirm={() => deleteMutation.mutate(id)}
        isLoading={deleteMutation.isPending}
      />
      <JobActions
        isOpen={open}
        setIsOpen={setOpen}
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
          companies_data: selectedJob.companies_data,
        }}
      />

      {/* buttons */}
      <div className="flex items-center gap-x-3">
        <button
          className={`w-8 h-8 ${styles.primaryBgColor} text-white rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setOpen(true)}
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
