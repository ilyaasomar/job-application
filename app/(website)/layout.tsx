import Navbar from "@/components/navbar";
import { TanstackProvider } from "./query-provider";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      {/* min-h-screen and flex-col allow the content to fill the page */}
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        {/* flex-1 makes this div grow to fill all remaining space */}
        <main className="flex-1 max-w-300 mx-auto w-full mt-4">{children}</main>
      </div>
    </TanstackProvider>
  );
}
