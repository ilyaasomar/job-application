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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
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
    oldPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isChangingPassword =
      data.oldPassword || data.password || data.confirmPassword;
    if (isChangingPassword) {
      if (!data.oldPassword || data.oldPassword.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Old password must be at least 6 characters.",
          path: ["oldPassword"],
        });
      }
      if (!data.password || data.password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 6 characters.",
          path: ["password"],
        });
      } else if (data.password.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at most 20 characters.",
          path: ["password"],
        });
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match.",
          path: ["confirmPassword"],
        });
      }
    }
  });

const ProfileInfo = ({ open, setOpen, user }: ProfileInfoProps) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

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

  // update user mutation
  const updateMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      oldPassword: string | undefined;
      password: string | undefined;
    }) => {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: async (data) => {
      console.log(data);
      const newData = data.data;
      await update({ name: newData.name, email: newData.email });

      toast.success("Syncing session...");
      toast.success(data.message);
      setOpen(false);

      // Give the cookie a moment to write, then refresh the server data
      setTimeout(() => {
        router.refresh();
      }, 100);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      oldPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    updateMutation.mutate(payload);
    console.log(payload);
  };
  return (
    <ActionDialog
      open={open}
      setOpen={setOpen}
      main_title="Profile Info"
      description="Update your profile info"
    >
      <Card className="w-full">
        <CardContent>
          <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-form-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="profile-form-name"
                      placeholder="John Doe"
                      autoComplete="off"
                      disabled={updateMutation.isPending}
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
                    <FieldLabel htmlFor="profile-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="profile-form-email"
                      placeholder="johndoe@gmail.com"
                      autoComplete="off"
                      disabled={updateMutation.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="col-span-2 my-3">
                <span className="text-sm text-muted-foreground flex text-center items-center justify-center my-2">
                  You can leave these blank if you don&apos;t want to change
                  them.
                </span>
                <FieldSeparator>Security Preferences</FieldSeparator>
              </div>
              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="profile-form-oldPassword">
                      Old Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="profile-form-oldPassword"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={updateMutation.isPending}
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
                    <FieldLabel htmlFor="profile-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="profile-form-password"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={updateMutation.isPending}
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
                    <FieldLabel htmlFor="profile-form-con-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="profile-form-con-password"
                      placeholder="••••••••"
                      autoComplete="off"
                      disabled={updateMutation.isPending}
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
              form="profile-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2" />
                  <span>Updating...</span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </ActionDialog>
  );
};

export default ProfileInfo;
