"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const navigation = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/notes",
    label: "My Commissions",
  },
  {
    href: "/to-do-list",
    label: "To-do List",
  },
];

export function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-bold text-slate-950" href="/">
          OmahTI Academy Final Project
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            {navigation.map((item) => (
              <Link
                className="hover:text-slate-950"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Show when="signed-out">
            <SignInButton>
              <button
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                type="button"
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                type="button"
              >
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}
