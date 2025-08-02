"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { changeTheme, setTheme } from "@/lib/features/theme/themeSlice";
import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Sidbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme?.theme);

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
    <div className="sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <Menu className="w-6 h-6" />
      </button>
      <nav
        className={`fixed top-0 right-0 h-screen transition-all duration-300 ${
          isOpen ? "w-52" : "w-0"
        } overflow-hidden bg-black`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 capitalize h-[600px] ">
          {data?.user === undefined ? (
            <li className=" flex flex-col gap-2">
              <LoginDialog />
              <SignupDialog />
            </li>
          ) : (
            <li className="flex flex-col gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png" />
                <AvatarFallback>user</AvatarFallback>
              </Avatar>
              <p>{data.user.name}</p>
            </li>
          )}
          <li>
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/job-list"
              className="hover:text-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              jobs
            </Link>
          </li>
          {data?.user.role === "employer" ? (
            <li>
              <Link
                href="/dashboard/employer/add-job"
                className="hover:text-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Add job
              </Link>
            </li>
          ) : null}
          <li>
            <Link
              href={`/dashboard/${data?.user.role}`}
              className="hover:text-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          {data?.user ? (
            <li
              onClick={() => signOut({ redirect: true, redirectTo: "/" })}
              className="text-red-500 cursor-pointer"
            >
              Sign out
            </li>
          ) : null}
          <li className="flex gap-2 items-center mt-auto">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => dispatch(changeTheme())}
            />
            <Label className="text-xs">Theme</Label>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidbar;
