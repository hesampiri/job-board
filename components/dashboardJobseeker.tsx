"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User, Company, Job, Application, Bookmark } from "@prisma/client";
import {
  Bookmark as BookmarkIcon,
  Briefcase,
  Eye,
  FileUser,
  Frown,
  Pencil,
  Trash,
} from "lucide-react";
import JobCard from "./jobCard";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJob from "@/app/actions/deleteJob";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            <div className="relative sm:w-[150px] sm:h-[150px] w-24 h-24 self-center mt-5 border-yellow-400 border-4 rounded-full">
              <Image
                alt="companyLogo"
                src={"/images/default-avatar-icon.jpg"}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="mt-5 px-2 space-y-2">
              <div>
                <h1 className="text-xs text-gray-500 capitalize">user name</h1>
                <p>{userInfo?.name}</p>
              </div>
              <div>
                <h1 className="text-xs text-gray-500 capitalize">Email</h1>
                <p>{userInfo?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-3 h-screen">
        {/* <div className="flex flex-col sm:flex-row gap-2 px-2">
          <div className="p-5 border flex-1 rounded text-center flex items-center justify-center flex-col max-h-[100px] font-semibold bg-yellow-100 ">
            <h1 className="text-3xl font-extrabold text-yellow-500">
              {applicationNumber}
            </h1>
            <p className="text-black">Applications recieved</p>
          </div>
          <div className="p-5 border flex-1 rounded text-center flex items-center justify-center flex-col max-h-[100px] font-semibold bg-yellow-100">
            <h1 className="text-3xl font-extrabold text-yellow-500">
              {userInfo?.company?.jobs.length}
            </h1>
            <p className="text-black">Job Posted</p>
          </div>
          <div className="p-5 border flex-1 rounded text-center flex items-center justify-center flex-col max-h-[100px] font-semibold bg-yellow-100">
            <h1 className="text-3xl font-extrabold text-yellow-500">
              {applicationperJob}
            </h1>
            <p className="text-black">Applications per Job </p>
          </div>
        </div> */}
        <div className="px-2 mt-5">
          <nav className="mt-10 mb-4  w-full text-sm border-b-2">
            <ul className="flex">
              <li
                onClick={() => setView("applications")}
                className={` p-2 cursor-pointer flex gap-2 items-center ${
                  view === "applications"
                    ? "border-yellow-400 text-yellow-400 border-b-4"
                    : ""
                }`}
              >
                <FileUser size={20} /> Applications sent
              </li>
              <li
                onClick={() => setView("bookmark")}
                className={`p-2 cursor-pointer flex gap-2 items-center ${
                  view === "bookmark"
                    ? "border-yellow-400 text-yellow-400 border-b-4"
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
                    className="w-full border rounded-sm p-5 flex items-center sm:flex-row flex-col sm:space-y-0 space-y-5 mt-1 shadow-md"
                    key={app.id}
                  >
                    <div>
                      <h1 className="font-semibold">{app.job.title}</h1>
                      <p className="text-xs">
                        created at {app.job.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2 w-full sm:w-auto">
                      <Button asChild className="flex-1" title="view the job ">
                        <Link href={`/job-list/${app.job.id}`}>
                          <Eye />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center  mt-20 capitalize font-semibold text-gray-500 flex flex-col items-center gap-4">
                  <h1>no applications sent</h1>
                  <Button variant={"outline"} asChild className="text-yellow-400 border-yellow-400">
                    <Link href={"/job-list"}>brows job</Link>
                  </Button>
                </div>
              )
            ) : userInfo?.bookmarks.length === 0 ? (
              <div className="text-center  mt-20 capitalize font-semibold text-gray-500 flex flex-col items-center">
                <Frown />
                <p className="mt-2">you dont have any bookmark</p>
              </div>
            ) : (
              userInfo?.bookmarks.map((book) => (
                <div
                  className="w-full border rounded-sm p-5 flex items-center sm:flex-row flex-col sm:space-y-0 space-y-5 mt-1 shadow-md"
                  key={book.id}
                >
                  <div>
                    <h1 className="font-semibold">{book.job.title}</h1>
                    <p className="text-xs">
                      created at {book.job.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2 w-full sm:w-auto">
                    <Button asChild className="flex-1" title="view the job ">
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
