// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// interface ShowJobDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   main_title?: string;
//   description?: string;
//   selectedJob: {
//     id: string;
//     job_title: string;
//     description: string;
//     type: string;
//     experienceLevel: string;
//     status: string;
//     location: string | null;
//     salaryMin: number | null;
//     salaryMax: number | null;
//     company_id: string;
//     company_name: string;
//     category_id: string | undefined;
//     category_name: string | undefined;
//   };
// }
// export function ShowJobDialog({
//   open,
//   setOpen,
//   main_title,
//   description,
//   selectedJob,
// }: ShowJobDialogProps) {
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>{main_title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4"></div>
//       </DialogContent>
//     </Dialog>
//   );
// }

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

interface ShowJobDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  main_title?: string;
  description?: string;
  selectedJob: {
    id: string;
    job_title: string;
    description: string;
    type: string;
    experienceLevel: string;
    status: string;
    location: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    company_id: string;
    company_name: string;
    category_id: string | undefined;
    category_name: string | undefined;
  };
}

export function ShowJobDialog({
  open,
  setOpen,
  main_title,
  description,
  selectedJob,
}: ShowJobDialogProps) {
  // Formatting helper for currency
  const formatCurrency = (val: number | null) =>
    val
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(val)
      : "N/A";

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
                <TableCell className="font-semibold w-1/4">Title</TableCell>
                <TableCell>{selectedJob.job_title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold w-1/4">Company</TableCell>
                <TableCell>{selectedJob.company_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Category</TableCell>
                <TableCell>
                  {selectedJob.category_name || "Uncategorized"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Location</TableCell>
                <TableCell>{selectedJob.location || "Remote"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Experience</TableCell>
                <TableCell>{selectedJob.experienceLevel}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Type</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {selectedJob.type}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Salary Range</TableCell>
                <TableCell>
                  {formatter.format(Number(selectedJob.salaryMin))} -{" "}
                  {formatter.format(Number(selectedJob.salaryMax))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      selectedJob.status === "ACTIVE"
                        ? `${styles.secondaryBgColor}`
                        : "bg-red-500",
                    )}
                  >
                    {selectedJob.status === "ACTIVE" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold align-top">
                  Description
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedJob.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
