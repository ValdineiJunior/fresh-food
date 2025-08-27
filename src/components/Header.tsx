"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
        (isActive
          ? "bg-foreground text-background"
          : "text-foreground/80 hover:text-foreground hover:bg-foreground/10")
      }
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="w-full border-b border-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Fresh Food
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/" label="Home" />
          <NavLink href="/shopping-list" label="Shopping List" />
          <NavLink href="/seasonal" label="Seasonal" />
        </nav>
      </div>
    </header>
  );
}
