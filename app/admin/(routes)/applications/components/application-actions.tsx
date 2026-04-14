"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { ActionDialog } from "./application-action-dialog";

const formSchema = z.object({
  status: z.string().min(1, "Status must be selected."),
});

interface ApplicationActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedApplication?: {
    id: string;
    status: string;
  };
}

const statusValues = [
  {
    value: "APPLIED",
    label: "Applied",
  },
  {
    value: "REVIEWING",
    label: "Reviewing",
  },
  {
    value: "OFFERED",
    label: "Offered",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

const ApplicationActions = ({
  isOpen,
  setIsOpen,
  selectedApplication,
}: ApplicationActionsProps) => {
  const isEditMode = !!selectedApplication?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });

  // append the data to the form

  useEffect(() => {
    if (selectedApplication) {
      form.reset({
        status: selectedApplication.status,
      });
    }
  }, [selectedApplication]);

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsOpen(false);
      router.refresh();
      form.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  // update mutation
  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch(
        `/api/applications/${selectedApplication?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsOpen(false);
      router.refresh();
      form.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation.mutate(values);
      //   console.log(values);
    } else {
      createMutation.mutate(values);
    }
  }
  return (
    <ActionDialog
      open={isOpen}
      setOpen={setIsOpen}
      main_title={isEditMode ? "Update Category" : "Create Category"}
      description={
        isEditMode
          ? "Update the category details and click update"
          : "Fill in the details of the new category and click create"
      }
    >
      <form id="category-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <FieldLabel>Status</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={
                    isEditMode
                      ? updateMutation.isPending
                      : createMutation.isPending
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Industry" />
                  </SelectTrigger>
                  <SelectContent className="overflow-y-auto max-h-50">
                    <SelectGroup>
                      {statusValues.map((st) => (
                        <SelectItem key={st.value} value={st.value}>
                          {st.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* buttons */}
          <Field orientation="horizontal" className="justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isEditMode || createMutation?.isPending}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="category-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
              disabled={
                isEditMode
                  ? updateMutation?.isPending
                  : createMutation?.isPending
              }
            >
              {isEditMode && updateMutation?.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating....
                </>
              ) : createMutation?.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : isEditMode ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </ActionDialog>
  );
};

export default ApplicationActions;
