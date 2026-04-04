"use client";
import {
  Home,
  Inbox,
  User2,
  ChevronUp,
  DollarSign,
  User,
  Layers2,
  FileUser,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { styles } from "@/app/styles";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Logo, LogoIcon } from "./logo";

const AppSidebar = () => {
  const session = useSession();

  const { state } = useSidebar();
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      title: "Dashboard",
      url: "/admin",
      icon: Home,
      isActive: pathname === "/admin",
    },
    {
      id: 2,
      title: "Companies",
      url: "/admin/companies",
      icon: Inbox,
      isActive: pathname.startsWith("/admin/companies"),
    },
    {
      id: 3,
      title: "Categories",
      url: "/admin/categories",
      icon: Layers2,
      isActive: pathname.startsWith("/admin/categories"),
    },
    {
      id: 4,
      title: "Jobs",
      url: "/admin/jobs",
      icon: DollarSign,
      isActive: pathname.startsWith("/admin/jobs"),
    },

    {
      id: 5,
      title: "Applications",
      url: "/admin/applications",
      icon: FileUser,
      isActive: pathname.startsWith("/admin/applications"),
    },
    {
      id: 6,
      title: "Applicants",
      url: "/admin/applicants",
      icon: User,
      isActive: pathname.startsWith("/admin/applicants"),
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {state === "expanded" ? <Logo /> : <LogoIcon />}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-2">
              {routes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      route.isActive
                        ? `${styles.primaryBgColor} text-white hover:${styles.primaryBgColor} hover:text-white focus:${styles.primaryBgColor} focus:text-white active:${styles.primaryBgColor} active:text-white data-[state=open]:${styles.primaryBgColor} data-[state=open]:text-white rounded-[3.5px]`
                        : `hover:${styles.primaryBgColor} rounded-[3.5px]`,
                    )}
                  >
                    <Link
                      key={route.id}
                      href={route.url}
                      className={cn(
                        "transition-all",
                        route.isActive
                          ? `${styles.primaryBgColor} text-white font-sans font-medium hover:${styles.primaryBgColor} hover:text-white focus:${styles.primaryBgColor} focus:text-white active:${styles.primaryBgColor} active:text-white`
                          : `font-sans font-medium text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700`,
                      )}
                    >
                      <route.icon />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="bg-gray-200 rounded-md py-1">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-gray-200 cursor-pointer">
                  <User2 />
                  <span className="font-semibold text-md">
                    {session.data?.user?.name}
                  </span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
