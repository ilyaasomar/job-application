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
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  category_name: z
    .string()
    .min(2, "Category name must be at least 2 characters.")
    .max(100, "Category name must be at most 100 characters."),
});

interface CategoryActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedCategory?: {
    id: string;
    category_name: string;
    slug: string;
  };
}

const CategoryActions = ({
  isOpen,
  setIsOpen,
  selectedCategory,
}: CategoryActionsProps) => {
  const isEditMode = !!selectedCategory?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
    },
  });

  // append the data to the form

  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        category_name: selectedCategory.category_name,
      });
    }
  }, [selectedCategory]);

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/categories", {
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
      const response = await fetch(`/api/categories/${selectedCategory?.id}`, {
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
            name="category_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category-name">Category Name</FieldLabel>{" "}
                <Input
                  {...field}
                  id="category-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Category Name"
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

export default CategoryActions;
