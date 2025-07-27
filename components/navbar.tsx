"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Sidbar from "./sidbar";
import { Switch } from "@/components/ui/switch";
import LoginDialog from "./loginDialog";
import SignupDialog from "./signupDialog";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/lib/features/theme/themeSlice";
import { RootState } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme?.theme);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex sm:flex-row justify-between items-center bg-black text-white p-4 container mx-auto sticky top-0 z-10">
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
          Job Board
        </h1>
      </Link>
      <ul className="sm:flex hidden flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base items-center">
        <li>
          <Button variant={"destructive"} onClick={() => signOut()}>
            Signout
          </Button>
        </li>
        <li>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => dispatch(changeTheme())}
          />
        </li>
        <li>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="hover:text-gray-300 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </li>
        {!user ? (
          <li className=" flex gap-2">
            <LoginDialog />
            <SignupDialog />
          </li>
        ) : (
          <li className=" flex gap-2">
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
