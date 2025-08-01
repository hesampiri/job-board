"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Sidbar from "./sidbar";
import { Switch } from "@/components/ui/switch";
import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, setTheme } from "@/lib/features/theme/themeSlice";
import { RootState } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Label } from "./ui/label";
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
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme?.theme);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      dispatch(setTheme(stored));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex sm:flex-row justify-between items-center bg-black text-white py-4 px-6 container mx-auto sticky top-0 z-10">
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">Jobly</h1>
      </Link>
      <ul className="sm:flex hidden flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base items-center">
        <li>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/job-list"
            className="hover:text-gray-300 transition-colors"
          >
            Jobs
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => dispatch(changeTheme())}
          />
          <Label className="text-xs">Theme</Label>
        </li>
        {!user ? (
          <li className=" flex gap-2">
            <LoginDialog />
            <SignupDialog />
          </li>
        ) : (
          <li className=" flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 py-1 px-3 cursor-pointer">
                  <span className="border py-1 px-2  w-[100px] rounded flex items-center justify-between gap-1">
                    <ChevronDown size={15} />
                    <p className="text-sm">user</p>
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="select-none">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "employer" ? (
                  <DropdownMenuItem asChild>
                    <Link
                      href={"/dashboard/employer/add-job"}
                      className="cursor-pointer"
                    >
                      Add job
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem asChild>
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ redirect: true, redirectTo: "/" })}
                  className="text-red-500 cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <Avatar>
                <AvatarImage src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </li>
        )}
      </ul>
      <Sidbar />
    </div>
  );
};

export default Navbar;
