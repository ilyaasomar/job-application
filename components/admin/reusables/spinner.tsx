import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

// spinner.tsx
export function SpinnerCustom() {
  return (
    // Replaced h-screen with h-full so it stays inside your layout boundaries
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] w-full gap-4">
      <Spinner className="size-8 text-blue-500" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}
