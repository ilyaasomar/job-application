"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { styles } from "@/app/styles";
import { Logo } from "./logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, User2, User2Icon } from "lucide-react";
import { User } from "next-auth";

const navbarLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Jobs", href: "/jobs" },
  // { name: "Companies", href: "/companies" },
  { name: "Dashboard", href: "/dashboard" },
];
interface ExtendedUser extends User {
  role?: string;
}
const Navbar = () => {
  const { data: session } = useSession();
  const user: ExtendedUser | undefined = session?.user;
  const router = useRouter();

  return (
    <nav className="w-full border-b pb-1">
      <div className="flex w-full max-w-300 mx-auto py-3">
        <div className="flex justify-between items-center w-full">
          <Logo />
          <div className="space-x-6">
            {navbarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {user && user.role === "SEEKER"
                  ? link.name
                  : link.name !== "Dashboard" && link.name}
              </Link>
            ))}
          </div>
          {/* user profile */}
          <div className="flex items-center">
            {user && user?.role === "SEEKER" ? (
              <DropdownMenu>
                <h2 className="text-muted-foreground font-semibold mr-2">
                  {user && user.role === "SEEKER" && user.name}
                </h2>
                <DropdownMenuTrigger className="border rounded-md">
                  <Avatar>
                    <AvatarImage
                      src={
                        user
                          ? (user.image as string)
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <User2Icon className="h-[1.2rem] w-[1.2rem] mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className={`cursor-pointer`}
                onClick={() => router.push("/auth/sign-in")}
              >
                Sign In
              </Button>
            )}

            {/* <Image
              src="/images/logo-icon.svg"
              alt="user profile"
              width={40}
              height={40}
              className="inline-block mr-2"
            /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
