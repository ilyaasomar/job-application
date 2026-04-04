"use client";
import React, { useState } from "react";
import { styles } from "@/app/styles";
import DeleteDialog from "@/components/admin/reusables/delete-dialog";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CategoryActions from "./category-actions";
interface ActionProps {
  id: string;
  category_name: string;
  slug: string;
}

const Actions = ({ id, category_name, slug }: ActionProps) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  //   delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/categories/${id}`, {
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
      <CategoryActions
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedCategory={{
          id,
          category_name,
          slug,
        }}
      />

      {/* buttons */}
      <div className="flex items-center gap-x-3">
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
