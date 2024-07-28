import SearchField from "@/components/SearchField";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";
import LogoIcon from "@/assets/icon.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            <Image
              src={LogoIcon}
              alt="bugbook logo"
              width={24}
              height={24}
              className="md:hidden"
            />
            <span className="hidden md:inline">bugbook</span>
          </Link>
          <SearchField />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <UserButton className="sm:ms-auto" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
