import Navbar from "@/components/navbar";
import { TanstackProvider } from "./query-provider";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <div className="w-full">
        <Navbar />
        <div className="max-w-300 mx-auto mt-4">{children}</div>
      </div>
    </TanstackProvider>
  );
}
