import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/admin" className="block h-8.75 w-35">
      <Image
        src="/images/the-carator-logo.svg"
        width={140}
        height={35}
        alt="logo"
        priority
      
        className="h-full w-auto"
      />
    </Link>
  );
}

export function LogoIcon() {
  return (
    <Link href="/admin" className="block h-8.75 w-10">
      <Image
        src="/images/logo-icon.svg"
        width={60}
        height={60}
        alt="logo"
        priority
        className="h-full w-auto"
      />
    </Link>
  );
}
