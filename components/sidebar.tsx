"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="grid h-9 w-9 place-items-center rounded-md border border-hairline text-ink"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed top-0 right-0 z-50 h-screen border-l border-hairline bg-surface-1 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between border-b border-hairline p-4">
          <h2 className="text-sm font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-ink-subtle hover:text-ink"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex flex-col gap-1 p-4 text-sm text-ink-subtle">
          {data?.user === undefined ? (
            <li className="mb-2 flex flex-col gap-2">
              <LoginDialog />
              <SignupDialog />
            </li>
          ) : (
            <li className="mb-2 flex items-center gap-3 border-b border-hairline pb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png" />
                <AvatarFallback>
                  {data.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-ink">{data.user.name}</span>
            </li>
          )}
          <li>
            <Link
              href="/"
              className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-2 hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/job-list"
              className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-2 hover:text-ink"
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
          </li>
          {data?.user.role === "employer" ? (
            <li>
              <Link
                href="/dashboard/employer/add-job"
                className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-2 hover:text-ink"
                onClick={() => setIsOpen(false)}
              >
                Post a job
              </Link>
            </li>
          ) : null}
          {data?.user ? (
            <li>
              <Link
                href={`/dashboard/${data.user.role}`}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-2 hover:text-ink"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          ) : null}
          {data?.user ? (
            <li
              onClick={() => signOut({ redirect: true, redirectTo: "/" })}
              className="mt-2 cursor-pointer rounded-md px-3 py-2 text-destructive transition-colors hover:bg-surface-2"
            >
              Sign out
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
