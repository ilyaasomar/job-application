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
  children: React.ReactNode;
}
export function ActionDialog({ open, setOpen, children }: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
