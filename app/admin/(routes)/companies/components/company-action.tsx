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
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(100, "Company name must be at most 100 characters."),
  logoUrl: z.string().min(1, "Logo must be chosen."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(5000, "Description must be at most 5000 characters."),
  industry: z.string().min(1, "Industry must be selected."),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters.")
    .max(100, "Location must be at most 100 characters."),
});
export const industries = [
  { value: "technology", label: "Technology & IT" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "manufacturing", label: "Manufacturing & Industrial" },
  { value: "finance", label: "Finance & Banking" },
  { value: "fintech", label: "Fintech" },
  { value: "healthcare", label: "Healthcare & Life Sciences" },
  { value: "education", label: "Education & E-learning" },
  { value: "logistics", label: "Logistics & Transportation" },
  { value: "real_estate", label: "Real Estate & Construction" },
  { value: "media", label: "Media & Entertainment" },
  { value: "hospitality", label: "Hospitality & Food Services" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "government", label: "Government & Public Sector" },
  { value: "nonprofit", label: "Non-Profit & NGO" },
  { value: "professional_services", label: "Professional Services" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "agriculture", label: "Agriculture & Farming" },
  { value: "automotive", label: "Automotive" },
  { value: "aerospace", label: "Aerospace & Defense" },
  { value: "pharmaceutical", label: "Pharmaceuticals" },
  { value: "biotechnology", label: "Biotechnology" },
  { value: "insurance", label: "Insurance" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "hr_recruiting", label: "HR & Recruiting" },
  { value: "legal", label: "Legal Services" },
  { value: "gaming", label: "Gaming & Esports" },
  { value: "ai_ml", label: "Artificial Intelligence & Machine Learning" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "blockchain", label: "Blockchain & Web3" },
  { value: "other", label: "Other" },
];

interface CompanyActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedCompany?: {
    id: string;
    company_name: string;
    logoUrl: string | null;
    description: string | null;
    industry: string | null;
    location: string | null;
  };
}
const CompanyActions = ({
  isOpen,
  setIsOpen,
  selectedCompany,
}: CompanyActionsProps) => {
  const isEditMode = !!selectedCompany?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      logoUrl: "",
      description: "",
      industry: "",
      location: "",
    },
  });

  // append the data to the form

  useEffect(() => {
    if (selectedCompany) {
      form.reset({
        company_name: selectedCompany.company_name,
        logoUrl: selectedCompany.logoUrl || "",
        description: selectedCompany.description || "",
        industry: selectedCompany.industry || "",
        location: selectedCompany.location || "",
      });
    }
  }, [selectedCompany]);

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/companies", {
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
      const response = await fetch(`/api/companies/${selectedCompany?.id}`, {
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
    <ActionDialog
      open={isOpen}
      setOpen={setIsOpen}
      main_title={isEditMode ? "Edit Company" : "Create Company"}
      description={
        isEditMode
          ? "Update the company details and click update"
          : "Fill in the details of the new company and click create"
      }
    >
      <form id="company-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="company_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company-name">Company Name</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="company-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Company Name"
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
              name="logoUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company-logo">Company Logo</FieldLabel>
                  <Input
                    id="company-logo"
                    type="file"
                    accept="image/*"
                    aria-invalid={fieldState.invalid}
                    disabled={
                      isEditMode
                        ? updateMutation.isPending
                        : createMutation.isPending
                    }
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onload = () => {
                        field.onChange(reader.result as string); // sets logoUrl = base64 string in RHF
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="location">Company Address</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    placeholder="Company Address"
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
              name="industry"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel>Industry</FieldLabel>
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
                        {industries.map((industry) => (
                          <SelectItem
                            key={industry.value}
                            value={industry.value}
                          >
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
              disabled={isEditMode || createMutation?.isPending}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="company-form"
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

export default CompanyActions;
