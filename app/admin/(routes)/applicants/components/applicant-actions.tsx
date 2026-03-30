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
import { Role } from "@/app/generated/prisma/enums";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
  role: z.nativeEnum(Role, {
    error: () => ({ message: "Role must be selected." }),
  }),
  avatarUrl: z.string().min(1, "Avatar must be chosen."),
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

interface ApplicantActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedApplicant?: {
    id: string;
    name: string;
    email: string;
    password: string | null;
    role: Role;
    avatarUrl: string | null;
    createdAt: string;
  };
}
const ApplicantActions = ({
  isOpen,
  setIsOpen,
  selectedApplicant,
}: ApplicantActionsProps) => {
  const isEditMode = !!selectedApplicant?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Role.SEEKER,
      avatarUrl: "",
    },
  });

  // append the data to the form

  useEffect(() => {
    if (selectedApplicant) {
      form.reset({
        name: selectedApplicant.name,
        email: selectedApplicant.email,
        password: selectedApplicant.password || "",
        role: selectedApplicant.role,
        avatarUrl: selectedApplicant.avatarUrl || "",
      });
    }
  }, [selectedApplicant]);

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/users", {
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
      const response = await fetch(`/api/users/${selectedApplicant?.id}`, {
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
      //   console.log(values);
    }
  }
  return (
    <ActionDialog open={isOpen} setOpen={setIsOpen}>
      <form id="applicant-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
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
              name="avatarUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                  <Input
                    id="avatar"
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
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel>Role</FieldLabel>
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
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-50">
                      <SelectGroup>
                        <SelectItem value="EMPLOYER">Employer</SelectItem>
                        <SelectItem value="SEEKER">Seeker</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
              form="applicant-form"
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

export default ApplicantActions;
