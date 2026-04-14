import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface ActionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  main_title?: string;
  description?: string;
  children: React.ReactNode;
}
export function ActionDialog({
  open,
  setOpen,
  main_title,
  description,
  children,
}: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{main_title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
