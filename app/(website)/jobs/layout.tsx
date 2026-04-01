import JobSidebar from "./job-sidebar";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex">
      <JobSidebar />
      <div className="overflow-x-auto px-4">{children}</div>
    </div>
  );
}
