import React from "react";
import { cookies } from "next/headers";
import Navbar from "@/components/admin/Navbar";
import AppSidebar from "@/components/admin/AppSidebar";
import { AdminProviders } from "./query-provider";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AdminProviders defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="overflow-x-auto px-4">{children}</div>
      </main>
    </AdminProviders>
  );
}
