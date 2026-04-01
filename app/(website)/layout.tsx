import Navbar from "@/components/navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-300 mx-auto mt-4">{children}</div>
    </div>
  );
}
