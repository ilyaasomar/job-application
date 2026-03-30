"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { ActionDialog } from "@/components/admin/reusables/action-dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
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
import { Loader2, Vault } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  job_title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be at most 100 characters."),
  company_id: z.string().min(1, "Company must be selected."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(5000, "Description must be at most 5000 characters."),
  type: z.string().min(1, "Type must be selected."),
  experienceLevel: z.string().min(1, "Experience must be selected."),
  status: z.string().min(1, "Status must be selected."),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters.")
    .max(100, "Location must be at most 100 characters."),
  salaryMin: z.number().min(1, "Minimum salary must be selected."),
  salaryMax: z.number().min(1, "Minimum salary must be selected."),
});
interface selectedJobProps {
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
  companies_data:
    | {
        id: string;
        name: string;
      }[]
    | null;
}
interface CompanyProps {
  id: string;
  name: string;
}
[];
const JobActions = ({
  isOpen,
  setIsOpen,
  company_data,
  selectedJob,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  company_data?: CompanyProps[];
  selectedJob?: selectedJobProps;
}) => {
  const isEditMode = selectedJob?.id;
  const companies = isEditMode ? selectedJob?.companies_data : company_data;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      company_id: "",
      location: "",
      experienceLevel: "",
      type: "",
      status: "",
      salaryMin: 0,
      salaryMax: 0,
      description: "",
    },
  });

  // append the data to the form
  useEffect(() => {
    if (selectedJob) {
      form.reset({
        job_title: selectedJob.job_title,
        company_id: selectedJob.company_id,
        location: selectedJob.location || "",
        experienceLevel: selectedJob.experienceLevel,
        type: selectedJob.type,
        status: selectedJob.status,
        salaryMin: selectedJob.salaryMin || 0,
        salaryMax: selectedJob.salaryMax || 0,
        description: selectedJob.description,
      });
    }
  }, [selectedJob]);

  //   create mutation
  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/jobs", {
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

  //   update mutation
  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch(`/api/jobs/${selectedJob?.id}`, {
        method: "PATCH",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditMode) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  }
  return (
    <ActionDialog open={isOpen} setOpen={setIsOpen}>
      <form id="job-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="job_title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-title">Title</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="job-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Job Title"
                    autoComplete="on"
                    disabled={
                      isEditMode
                        ? updateMutation.isPending
                        : createMutation.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="company_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel>Company</FieldLabel>
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
                      <SelectValue placeholder="Choose company" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-50">
                      <SelectGroup>
                        {companies?.map((company: CompanyProps) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location">Location</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    placeholder="Location"
                    autoComplete="on"
                    disabled={
                      isEditMode
                        ? updateMutation.isPending
                        : createMutation.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="experienceLevel"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel>Experience Level</FieldLabel>
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
                      <SelectValue placeholder="Choose level" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-50">
                      <SelectGroup>
                        <SelectItem value="JUNIOR">Junior</SelectItem>
                        <SelectItem value="MID">Mid</SelectItem>
                        <SelectItem value="SENIOR">Senior</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel>Type</FieldLabel>
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
                      <SelectValue placeholder="Choose Type" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-50">
                      <SelectGroup>
                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

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
                      <SelectValue placeholder="Choose status" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-50">
                      <SelectGroup>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="salaryMin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="minimum-salary">
                    Minimum Salary
                  </FieldLabel>{" "}
                  <Input
                    type="number"
                    id="minimum-salary"
                    aria-invalid={fieldState.invalid}
                    placeholder="Minimum Salary"
                    autoComplete="on"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    disabled={
                      isEditMode
                        ? updateMutation.isPending
                        : createMutation.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="salaryMax"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="maximum-salary">
                    Maximum Salary
                  </FieldLabel>{" "}
                  <Input
                    type="number"
                    id="maximum-salary"
                    aria-invalid={fieldState.invalid}
                    placeholder="Maximum Salary"
                    autoComplete="on"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    disabled={
                      isEditMode
                        ? updateMutation.isPending
                        : createMutation.isPending
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      placeholder="Description of the company"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      disabled={
                        isEditMode
                          ? updateMutation.isPending
                          : createMutation.isPending
                      }
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* buttons */}
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={
                isEditMode ? updateMutation.isPending : createMutation.isPending
              }
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="job-form"
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

export default JobActions;
