"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
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
import React from "react";
import { Github, Loader2, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

const SignIn = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        // console.error(res);
        toast.error(
          res.error === "CredentialsSignin"
            ? "Invalid email or password."
            : "Something went wrong.",
        );
      } else if (res?.ok) {
        toast.success("Signed in successfully!");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black p-3">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Please fill out the form below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signin-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="signin-form-email"
                      placeholder="johndoe@gmail.com"
                      autoComplete="on"
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
                    <FieldLabel htmlFor="signin-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signin-form-password"
                      placeholder="••••••••"
                      autoComplete="on"
                      disabled={loading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              form="signin-form"
              disabled={loading}
              className={cn(
                "mt-4 w-full flex items-center justify-center cursor-pointer gap-x-2",
                styles.primaryBgColor,
                `text-white hover:${styles.primaryBgColor}`,
              )}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              Sign in with Email
            </Button>

            {/* --- Divider --- */}
            <div className="flex items-center cursor-pointer gap-x-2 my-2">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            </div>
            {/* --- Google & GitHub Buttons --- */}
            <div className="grid grid-cols-2 gap-x-3 ">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center cursor-pointer gap-x-2"
                onClick={() => signIn("google")}
                disabled={loading}
              >
                <FcGoogle size={20} className="h-5 w-5 text-red-500" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-x-2"
                onClick={() => signIn("github")}
                disabled={loading}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </form>
        </CardContent>

        <div className="flex flex-col items-center justify-center gap-y-2 mb-4">
          <Link
            href="/forgot-password"
            className={cn(
              "font-semibold text-sm",
              loading && "pointer-events-none opacity-50",
              styles.primaryColor,
            )}
          >
            Forgot your password?
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              "font-semibold text-sm",
              loading && "pointer-events-none opacity-50",
              styles.primaryColor,
            )}
          >
            Not have an account? Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
