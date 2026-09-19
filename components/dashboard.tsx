"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User, Company, Job, Application } from "@prisma/client";
import { Briefcase, Eye, FileUser, Frown, Pencil, Trash } from "lucide-react";
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
  userInfo:
    | (User & {
        company:
          | (Company & {
              jobs: (Job & {
                applications: (Application & {
                  user: User;
                })[];
              })[];
            })
          | null;
      })
    | null;
};

const Dashboard = ({ userInfo }: DashProp) => {
  const router = useRouter();
  const [applicationNumber, setapplicationNumber] = useState(0);
  const [applicationperJob, setApplicationperJob] = useState("0");
  const [allApplications, setAllApplications] = useState<
    (Application & { user: User })[]
  >([]);
  const [view, setView] = useState("jobs");

  useEffect(() => {
    const jobs = userInfo?.company?.jobs;
    if (!jobs?.length) return;

    const allApps = jobs.flatMap((job) => job.applications);
    const total = allApps.length;
    const appPerJob = total / jobs.length;

    setapplicationNumber(total);
    setApplicationperJob(appPerJob.toFixed(1));
    setAllApplications(allApps);
  }, []);

  async function deleteHandle(id: string) {
    const deletedJob = await DeleteJob(id);
    if (deletedJob.type === "success") {
      toast.success(deletedJob.message);
      router.refresh();
    } else {
      toast.error(deletedJob.message);
    }
  }

  return (
    <div className=" grid sm:grid-cols-4 container mx-auto">
      <div className="sm:col-span-1 rounded  w-full  mb-5 py-5">
        <div>
          <div className="flex flex-col ">
            <div className="relative sm:w-[150px] sm:h-[150px] w-24 h-24 self-center mt-5 border-hairline border-2 rounded-full">
              <Image
                alt={`${userInfo?.company?.name} logo`}
                src={userInfo?.company?.logoUrl || "/images/default-cmpny.jpg"}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="mt-5 px-5 space-y-2">
              <div>
                <h1 className="text-xs text-ink-subtle capitalize">
                  company name
                </h1>
                <p>{userInfo?.company?.name}</p>
              </div>
              <div>
                <h1 className="text-xs text-ink-subtle capitalize">
                  website Url
                </h1>
                <Link
                  href={userInfo?.company?.website || "https://www.google.com"}
                >
                  {userInfo?.company?.website || `${userInfo?.company?.name}.com`}
                </Link>
              </div>
              <div>
                <h1 className="text-xs text-ink-subtle capitalize">
                  about the company
                </h1>
                <p>{userInfo?.company?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:col-span-3 h-screen">
        <div className="flex flex-col sm:flex-row gap-2 px-2">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-hairline bg-surface-1 p-6 text-center font-semibold ">
            <h1 className="text-3xl font-extrabold text-ink">
              {applicationNumber}
            </h1>
            <p className="text-foreground">Applications received</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-hairline bg-surface-1 p-6 text-center font-semibold ">
            <h1 className="text-3xl font-extrabold text-ink">
              {userInfo?.company?.jobs.length}
            </h1>
            <p className="text-foreground">Job Posted</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-hairline bg-surface-1 p-6 text-center font-semibold ">
            <h1 className="text-3xl font-extrabold text-ink">
              {applicationperJob}
            </h1>
            <p className="text-foreground">Applications per Job </p>
          </div>
        </div>
        <div className="px-2 mt-5">
          <nav className="mt-10 mb-4  w-full text-sm border-b-2" role="tablist">
            <ul className="flex">
              <li
                role="tab"
                aria-selected={view === "jobs"}
                onClick={() => setView("jobs")}
                className={` p-2 cursor-pointer flex gap-2 items-center ${
                  view === "jobs"
                    ? "border-primary text-ink border-b-2"
                    : ""
                }`}
              >
                <Briefcase size={20} /> Job Posted
              </li>
              <li
                role="tab"
                aria-selected={view === "application"}
                onClick={() => setView("application")}
                className={`p-2 cursor-pointer flex gap-2 items-center ${
                  view === "application"
                    ? "border-primary text-ink border-b-2"
                    : ""
                }`}
              >
                <FileUser size={20} /> Applications
              </li>
            </ul>
          </nav>
          <div className="max-h-[700px] overflow-auto">
            {view === "jobs" ? (
              userInfo?.company?.jobs.map((job) => (
                <div
                  className="w-full border border-hairline rounded-xl bg-surface-1 p-5 flex items-center sm:flex-row flex-col sm:space-y-0 space-y-5 mt-1"
                  key={job.id}
                >
                  <div>
                    <h1 className="font-semibold">{job.title}</h1>
                    <p className="text-xs">
                      created at {job.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2 w-full sm:w-auto">
                    <Button
                      asChild
                      className="flex-1"
                      aria-label="View job"
                    >
                      <Link href={`/job-list/${job.id}`}>
                        <Eye />
                      </Link>
                    </Button>
                    <Button
                      className="flex-1"
                      aria-label="Edit job"
                      variant={"outline"}
                      asChild
                    >
                      <Link href={`employer/update-job/${job.id}`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="flex-1"
                          aria-label="Delete job"
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your job post and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              aria-label="Confirm delete job"
                              variant={"destructive"}
                              onClick={() => deleteHandle(job.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            ) : allApplications.length === 0 ? (
              <div className="text-center  mt-20 capitalize font-semibold text-ink-subtle flex flex-col items-center">
                <Frown />
                <p className="mt-2">there are no applications sent</p>
              </div>
            ) : (
              allApplications.map((app) => (
                <div
                  key={app.id}
                  className="w-full rounded-sm border p-2 space-y-2 mt-1"
                >
                  <div>
                    <h1 className="text-xs text-ink-subtle">name</h1>
                    <p>{app.user.name}</p>
                  </div>
                  <div>
                    <h1 className="text-xs text-ink-subtle">
                      contact Info
                    </h1>
                    <p>{app.user.email}</p>
                  </div>
                  <div>
                    <h1 className="text-xs text-ink-subtle">applied at</h1>
                    <p>{app.createdAt.toLocaleString()}</p>
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

export default Dashboard;
