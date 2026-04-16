"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { styles } from "@/app/styles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

const formSchema = z.object({
  applicant_name: z.string(),
  applicant_email: z.string(),
  // job details
  company_name: z.string(),
  job_title: z.string(),
  //
  resumeFile: z.instanceof(File, { message: "Resume must be uploaded." }),
  coverLetterFile: z.instanceof(File, {
    message: "Cover letter must be uploaded.",
  }),
  notes: z.string().optional(),
});

const ApplyPage = () => {
  const params = useParams();
  const jobId = params.jobId;
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;

  // console.log(jobId);
  const { startUpload, isUploading } = useUploadThing("applicationDocuments");

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicant_name: "",
      applicant_email: "",
      company_name: "",
      job_title: "",
      resumeFile: "" as any,
      coverLetterFile: "" as any,
      notes: "",
    },
  });

  // query mutation
  const { data } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        applicant_name: user.name ?? "",
        applicant_email: user.email ?? "",
        company_name: data?.company.name ?? "",
        job_title: data?.title ?? "",
      });
    }
  }, [user, data]);

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch(`/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      form.reset();
      toast.success(data.message);
      router.push(`/jobs/${jobId}`);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Step 1 — upload both files to UploadThing at the same time
    // Promise.all means they run in parallel, not one after the other
    const [uploadedResume, uploadedCoverLetter] = await Promise.all([
      startUpload([values.resumeFile]),
      startUpload([values.coverLetterFile]),
    ]);

    // Step 2 — check both came back with URLs
    if (!uploadedResume?.[0]?.url || !uploadedCoverLetter?.[0]?.url) {
      console.error("Upload failed");
      return;
    }

    // Step 3 — now you have clean URLs, send everything to your API
    const payload = {
      applicantId: user?.id,
      jobId: jobId,
      resumeUrl: uploadedResume[0].url,
      coverLetter: uploadedCoverLetter[0].url,
      notes: values.notes,
    };

    // Step 4 — fire your mutation with the complete payload
    createMutation.mutate(payload);
  };
  return (
    <Card className="w-full p-6">
      <form id="applicant-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="applicant_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="applicant-name">
                    Applicant Name
                  </FieldLabel>{" "}
                  <Input
                    {...field}
                    id="applicant-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Applicant Name"
                    autoComplete="on"
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="applicant_email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="applicant-email">Email</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="applicant-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Applicant Email"
                    autoComplete="on"
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="job_title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-title">Job Title</FieldLabel>{" "}
                  <Input
                    {...field}
                    id="job-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Job Title"
                    autoComplete="on"
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="resumeFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="resume">Resume</FieldLabel>
                  <Input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    aria-invalid={fieldState.invalid}
                    disabled={isUploading || createMutation?.isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      // just store the File object, nothing else happens yet
                      field.onChange(file);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="coverLetterFile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cover-letter">Cover Letter</FieldLabel>{" "}
                  <Input
                    id="cover-letter"
                    type="file"
                    accept="application/pdf"
                    aria-invalid={fieldState.invalid}
                    disabled={isUploading || createMutation?.isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      // just store the File object, nothing else happens yet
                      field.onChange(file);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="notes"
                      placeholder="Notes (optional)"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      disabled={isUploading || createMutation?.isPending}
                    />
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
              disabled={isUploading || createMutation?.isPending}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="applicant-form"
              className={`cursor-pointer ${styles.primaryBgColor} hover:${styles.primaryBgColor}`}
              disabled={isUploading || createMutation?.isPending}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : createMutation?.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default ApplyPage;
