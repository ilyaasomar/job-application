"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldDescription,
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

const formSchema = z.object({
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(32, "Company name must be at most 32 characters."),
  logoUrl: z.string(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters.")
    .max(32, "Industry must be at most 32 characters."),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters.")
    .max(32, "Location must be at most 32 characters."),
});
interface CompanyActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
const CompanyActions = ({ isOpen, setIsOpen }: CompanyActionsProps) => {
  const isEditMode = false;
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

  function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <ActionDialog open={isOpen} setOpen={setIsOpen}>
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
                  <FieldLabel htmlFor="company-logo">Company Logo</FieldLabel>{" "}
                  <Input id="picture" type="file" />
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
                <Field className="w-full">
                  <FieldLabel>Department</FieldLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
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
                  <FieldLabel htmlFor="location">Company Address</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    placeholder="Company Address"
                    autoComplete="on"
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
              //   disabled={isEditMode}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="company-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
              //   disabled={
              //     isEditMode
              //       ? updateMutation?.isPending
              //       : createMutation?.isPending
              //   }
            >
              {/* {isEditMode && updateMutation?.isPending ? (
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
              ) : ( */}
              Create
              {/* )} */}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </ActionDialog>
  );
};

export default CompanyActions;
