"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUploadThing } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  profile_picture: z
    .any()
    .optional()
    .refine((file) => file instanceof File || file === undefined, {
      message: "Please upload a valid image file.",
    }),
});

interface ProfilePictureFormProps {
  userInfo: {
    id: string;
    name?: string | undefined | null;
    image?: string | null;
  };
}

export default function ProfilePictureForm({
  userInfo,
}: ProfilePictureFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, update } = useSession();
  const { startUpload, isUploading } = useUploadThing("avatar");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { profile_picture: undefined },
  });

  useEffect(() => {
    if (userInfo?.image) {
      setPreview(userInfo.image);
    }
  }, [userInfo]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("profile_picture", file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // image mutation
  const imageMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch(`/api/users/${userInfo?.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: async (data) => {
      const newImageUrl = data.data.image;
      await update({
        user: {
          ...session?.user,
          image: newImageUrl,
        },
      });
      toast.success(data.message);

      // Give the cookie a moment to write, then refresh the server data
      setTimeout(() => {
        router.refresh();
      }, 100);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async () => {
    if (!preview) return;
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    // console.log(file);

    // const uploadProfile = await startUpload([file]);
    const uploadProfile = await startUpload([file]);
    if (!uploadProfile?.[0]?.url) {
      console.error("Upload failed");
      return;
    }

    const payload = {
      avatarUrl: uploadProfile[0].url,
    };

    imageMutation.mutate(payload);
  };

  return (
    <Card className="lg:w-1/3 w-full">
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your profile photo
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="profile_picture"
              render={() => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="sr-only">Profile Picture</FormLabel>
                  <FormControl>
                    <div
                      onClick={handleClick}
                      className="relative w-28 h-28 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-gray-600 cursor-pointer group overflow-hidden"
                    >
                      {preview ? (
                        <Image
                          src={preview}
                          alt="Profile"
                          width={112}
                          height={112}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <span className="group-hover:opacity-60 transition-opacity">
                          {userInfo.name
                            ? userInfo.name.charAt(0).toUpperCase()
                            : "IM"}
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                        <span className="text-xs text-white font-medium">
                          Change
                        </span>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={isUploading || imageMutation.isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={isUploading || imageMutation.isPending}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : imageMutation?.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Picture"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
