import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatter } from "@/lib/utils";
import { styles } from "@/app/styles";

interface ShowApplicationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  main_title?: string;
  description?: string;
  selectedApplication: {
    applicant_name: string;
    email: string;
    job_title: string;
    salaryMin: number | null;
    salaryMax: number | null;
    company_name: string;
    resumeUrl: string;
    coverLetter: string | null;
    status: string;
    notes: string | null;
  };
}

export function ShowApplicationDialog({
  open,
  setOpen,
  main_title,
  description,
  selectedApplication,
}: ShowApplicationDialogProps) {
  // Formatting helper for currency
  const statusColors = (status: string) => {
    if (status === "APPLIED") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (status === "REVIEWING") {
      return "bg-sky-50 text-sky-700 border-sky-200";
    }
    if (status === "OFFERED") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (status === "REJECTED") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{main_title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
          <Table className="border rounded-md">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold w-1/4">Name</TableCell>
                <TableCell>{selectedApplication.applicant_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold w-1/4">Email</TableCell>
                <TableCell>{selectedApplication.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold w-1/4">Job Title</TableCell>
                <TableCell>{selectedApplication.job_title}</TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell className="font-semibold w-1/4">
                  Company Name
                </TableCell>
                <TableCell>{selectedApplication.company_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Resume</TableCell>
                <TableCell>
                  {/* {selectedApplication.resumeUrl} */}
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-2"
                  >
                    View Resume
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Cover Letter</TableCell>
                <TableCell>
                  {/* {selectedApplication.coverLetter} */}
                  {selectedApplication.coverLetter ? (
                    <a
                      href={selectedApplication.coverLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Cover Letter
                    </a>
                  ) : (
                    <span className="text-muted-foreground italic">
                      No cover letter provided
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Salary Range</TableCell>
                <TableCell>
                  {formatter.format(Number(selectedApplication.salaryMin))} -{" "}
                  {formatter.format(Number(selectedApplication.salaryMax))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold align-top">
                  Description
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedApplication.notes}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell>
                  <Badge
                    className={cn(statusColors(selectedApplication.status))}
                  >
                    {selectedApplication.status === "APPLIED"
                      ? "Applied"
                      : selectedApplication.status === "REVIEWING"
                        ? "Reviewing"
                        : selectedApplication.status === "OFFERED"
                          ? "Offered"
                          : selectedApplication.status === "REJECTED"
                            ? "Rejected"
                            : ""}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
