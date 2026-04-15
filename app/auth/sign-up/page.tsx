"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must be at most 20 characters."),
    confirmPassword: z.string(),
    role: z.enum(["EMPLOYER", "SEEKER"], {
      error: "Please select a role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "SEEKER",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 400) {
        toast.error(result.message);
        setLoading(false);
        router.push("/auth/sign-up");
      } else {
        toast.success(result.message);
        setLoading(false);
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black p-3">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Please fill out the form below to sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>I am a</FieldLabel>
                    <Field orientation="horizontal">
                      <Button
                        type="button"
                        className={
                          field.value === "EMPLOYER"
                            ? "w-1/2 bg-[#4191F9] text-white hover:bg-[#4191F9]/90 cursor-pointer"
                            : "w-1/2 bg-white border border-[#4191F9] text-black hover:bg-white/90 hover:border hover:border-[#4191F9] cursor-pointer"
                        }
                        onClick={() => field.onChange("EMPLOYER")}
                        disabled={loading}
                      >
                        Employer
                      </Button>
                      <Button
                        type="button"
                        className={
                          field.value === "SEEKER"
                            ? "w-1/2 bg-[#4191F9] text-white hover:bg-[#4191F9]/90 cursor-pointer"
                            : "w-1/2 bg-white border border-[#4191F9] text-black hover:bg-white/90 hover:border hover:border-[#4191F9] cursor-pointer"
                        }
                        onClick={() => field.onChange("SEEKER")}
                        disabled={loading}
                      >
                        Job Seeker
                      </Button>
                    </Field>
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
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="cursor-pointer"
              disabled={loading}
            >
              Reset
            </Button>
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
        <div className="flex flex-col items-center justify-center gap-y-2 mb-4">
          <Link
            href="/auth/sign-in"
            className={cn(
              "font-semibold text-sm",
              loading && "pointer-events-none opacity-50",
              styles.primaryColor,
            )}
          >
            Already have an account? Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
