"use client";
import Link from "next/link";
import React from "react";
import Sidebar from "./sidebar";
import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-[4px] bg-primary text-[11px] font-semibold text-primary-foreground">
            J
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Jobly
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-ink-subtle sm:flex">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/job-list"
              className="transition-colors hover:text-ink"
            >
              Jobs
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {!user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <LoginDialog />
              <SignupDialog />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border border-hairline bg-surface-1 py-1.5 pl-2 pr-3 text-sm text-ink transition-colors hover:border-hairline-strong">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png" />
                    <AvatarFallback className="text-[10px]">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} className="text-ink-subtle" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-hairline bg-surface-2"
              >
                <DropdownMenuLabel className="select-none text-xs text-ink-subtle">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-hairline" />
                {user.role === "employer" ? (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/employer/add-job" className="cursor-pointer">
                      Post a job
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${user.role}`} className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-hairline" />
                <DropdownMenuItem
                  onClick={() => signOut({ redirect: true, redirectTo: "/" })}
                  className="cursor-pointer text-destructive"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
