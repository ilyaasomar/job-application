import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { styles } from "@/app/styles";
const navbarLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Dashboard", href: "/dashboard" },
];
const Navbar = () => {
  return (
    <nav className="w-full border-b pb-1">
      <div className="flex w-full max-w-300 mx-auto py-3">
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="block h-[60px] w-[150px]">
            <Image
              src="/images/the-carator-logo.svg"
              width={150}
              height={60}
              alt="logo"
              priority
              className="h-full w-auto"
            />
          </Link>
          <div className="space-x-6">
            {navbarLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
          {/* user profile */}
          <div className="flex items-center">
            <Button
              className={`${styles.primaryBgColor} hover:${styles.primaryBgColor} text-white cursor-pointer`}
            >
              Sign In
            </Button>

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
