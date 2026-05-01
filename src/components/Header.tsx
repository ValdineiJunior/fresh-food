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
        "rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 " +
        (isActive
          ? "bg-primary text-white shadow-sm"
          : "text-muted hover:bg-primary-muted hover:text-foreground")
      }
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Comida Fresca
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Principal"
        >
          <NavLink href="/" label="Início" />
          <NavLink href="/shopping-list" label="Lista" />
          <NavLink href="/seasonal" label="Sazonal" />
          <NavLink href="/monthly" label="Mensal" />
        </nav>
      </div>
    </header>
  );
}
