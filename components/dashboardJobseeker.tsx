"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Job, Application, Bookmark } from "@prisma/client";
import { Bookmark as BookmarkIcon, Eye, FileUser, Frown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export type DashProp = {
  userInfo: {
    name: string;
    email: string;
    bookmarks: (Bookmark & { job: Job })[];
    applications: (Application & { job: Job })[];
  } | null;
};

const DashboardJobseeker = ({ userInfo }: DashProp) => {
  const [view, setView] = useState("applications");
  return (
    <div className=" grid sm:grid-cols-4 container mx-auto">
      <div className="sm:col-span-1 rounded  w-full  mb-5 py-5">
        <div>
          <div className="flex flex-col ">
            <div className="relative sm:w-[150px] sm:h-[150px] w-24 h-24 self-center mt-5 border-hairline border-2 rounded-full">
              <Image
                alt="User avatar"
                src={"/images/default-avatar-icon.jpg"}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="mt-5 px-5 space-y-2">
              <div>
                <h1 className="text-xs text-ink-subtle capitalize">
                  user name
                </h1>
                <p>{userInfo?.name}</p>
              </div>
              <div>
                <h1 className="text-xs text-ink-subtle capitalize">
                  Email
                </h1>
                <p>{userInfo?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-3 h-screen">
        <div className="flex flex-col sm:flex-row gap-2 px-2">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-hairline bg-surface-1 p-6 text-center font-semibold ">
            <h1 className="text-3xl font-extrabold text-ink">
              {userInfo?.applications.length}
            </h1>
            <p className="text-foreground">Applications sent</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-hairline bg-surface-1 p-6 text-center font-semibold ">
            <h1 className="text-3xl font-extrabold text-ink">
              {userInfo?.bookmarks.length}
            </h1>
            <p className="text-foreground">Job saved</p>
          </div>
        </div>
        <div className="px-2 mt-5">
          <nav className="mt-10 mb-4  w-full text-sm border-b-2" role="tablist">
            <ul className="flex">
              <li
                role="tab"
                aria-selected={view === "applications"}
                onClick={() => setView("applications")}
                className={` p-2 cursor-pointer flex gap-2 items-center ${
                  view === "applications"
                    ? "border-primary text-ink border-b-2"
                    : ""
                }`}
              >
                <FileUser size={20} /> Applications sent
              </li>
              <li
                role="tab"
                aria-selected={view === "bookmark"}
                onClick={() => setView("bookmark")}
                className={`p-2 cursor-pointer flex gap-2 items-center ${
                  view === "bookmark"
                    ? "border-primary text-ink border-b-2"
                    : ""
                }`}
              >
                <BookmarkIcon size={20} /> Bookmarks
              </li>
            </ul>
          </nav>
          <div className="max-h-[700px] overflow-auto">
            {view === "applications" ? (
              userInfo?.applications.length !== 0 ? (
                userInfo?.applications.map((app) => (
                  <div
                    className="w-full border border-hairline rounded-xl bg-surface-1 p-5 flex items-center sm:flex-row flex-col sm:space-y-0 space-y-5 mt-1"
                    key={app.id}
                  >
                    <div>
                      <h1 className="font-semibold">{app.job.title}</h1>
                      <p className="text-xs">
                        created at {app.job.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2 w-full sm:w-auto">
                      <Button
                        asChild
                        className="flex-1"
                        aria-label="View job"
                      >
                        <Link href={`/job-list/${app.job.id}`}>
                          <Eye />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center  mt-20 capitalize font-semibold text-ink-subtle flex flex-col items-center gap-4">
                  <h1>no applications sent</h1>
                  <Button variant={"outline"} asChild>
                    <Link href={"/job-list"}>Browse jobs</Link>
                  </Button>
                </div>
              )
            ) : userInfo?.bookmarks.length === 0 ? (
              <div className="text-center  mt-20 capitalize font-semibold text-ink-subtle flex flex-col items-center">
                <Frown />
                <p className="mt-2">you don&apos;t have any bookmarks</p>
              </div>
            ) : (
              userInfo?.bookmarks.map((book) => (
                <div
                  className="w-full border border-hairline rounded-xl bg-surface-1 p-5 flex items-center sm:flex-row flex-col sm:space-y-0 space-y-5 mt-1"
                  key={book.id}
                >
                  <div>
                    <h1 className="font-semibold">{book.job.title}</h1>
                    <p className="text-xs">
                      created at {book.job.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2 w-full sm:w-auto">
                    <Button
                      asChild
                      className="flex-1"
                      aria-label="View job"
                    >
                      <Link href={`/job-list/${book.job.id}`}>
                        <Eye />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobseeker;
