"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { styles } from "@/app/styles";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/app/generated/prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

// ✅ Zod validation schema
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  userInfo: User | null;
}

const PersonalInfoForm = ({ userInfo }: PersonalInfoFormProps) => {
  const user = userInfo;
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    mode: "onChange",
  });

  // update user mutation
  const updateMutation = useMutation({
    mutationFn: async (payload: { name: string; email: string }) => {
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
      toast.success(data.message);
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
  const onSubmit = async (values: PersonalInfoFormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
    };
    updateMutation.mutate(payload);
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your personal details
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ilyas Omar"
                      {...field}
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ilyasomar@example.com"
                      type="email"
                      {...field}
                      disabled={updateMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end mt-2">
              <Button
                type="submit"
                className={`${styles.secondaryBgColor} hover:${styles.primaryBgColor} rounded-sm dark:${styles.secondaryBgColor} dark:text-white cursor-pointer`}
                disabled={!isValid || isSubmitting}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
