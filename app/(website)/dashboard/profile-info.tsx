"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActionDialog } from "./form-dialog";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface ProfileInfoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user:
    | {
        id: string;
        name: string;
        email: string;
      }
    | undefined;
}
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z.string().email("Please enter a valid email address."),
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be at most 20 characters.")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
const ProfileInfo = ({ open, setOpen, user }: ProfileInfoProps) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      oldPassword: "" as string | undefined,
      password: "" as string | undefined,
      confirmPassword: "" as string | undefined,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        name: user?.name,
        email: user?.email,
        oldPassword: "" as string | undefined,
        password: "" as string | undefined,
        confirmPassword: "" as string | undefined,
      });
    }
  }, [open]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {};
  return (
    <ActionDialog
      open={open}
      setOpen={setOpen}
      main_title="Profile Info"
      description="Update your profile info"
    >
      <Card className="w-full">
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-name"
                      placeholder="John Doe"
                      autoComplete="off"
                      disabled={loading}
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
                    <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-email"
                      placeholder="johndoe@gmail.com"
                      autoComplete="off"
                      disabled={loading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-oldPassword">
                      Old Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signup-form-oldPassword"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={loading}
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
                    <FieldLabel htmlFor="signup-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signup-form-password"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={loading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-con-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signup-form-con-password"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={loading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="signup-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
              disabled={loading}
            >
              Sign Up
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </ActionDialog>
  );
};

export default ProfileInfo;
