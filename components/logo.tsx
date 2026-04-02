import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="block h-8.75 w-35">
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
