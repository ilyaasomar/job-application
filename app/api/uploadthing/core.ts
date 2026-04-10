import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  applicationDocuments: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(({ file }) => {
    console.log("File URL:", file.url);
  }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
