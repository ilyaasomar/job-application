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
import { LogOut, Settings, User } from "lucide-react";

const navbarLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Jobs", href: "/jobs" },
  // { name: "Companies", href: "/companies" },
  { name: "Dashboard", href: "/dashboard" },
];
const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <nav className="w-full border-b pb-1">
      <div className="flex w-full max-w-300 mx-auto py-3">
        <div className="flex justify-between items-center w-full">
          <Logo />
          <div className="space-x-6">
            {navbarLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {session.data?.user
                  ? link.name
                  : link.name !== "Dashboard" && link.name}
              </Link>
            ))}
          </div>
          {/* user profile */}
          <div className="flex items-center">
            {session.data?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-[1.2rem] w-[1.2rem] mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-[1.2rem] w-[1.2rem] mr-2" /> Settings
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
                className={`${styles.primaryBgColor} hover:${styles.primaryBgColor} text-white cursor-pointer`}
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
