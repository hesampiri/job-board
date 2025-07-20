import { prisma } from "@/prisma";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const JobList = async () => {
  const jobs = await prisma.job.findMany();
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3">
        {jobs.map((job) => (
          <div key={job.id} className="p-5 border w-full flex justify-between">
            <div>
              <p>{job.title}</p>
              <p>{job.description}</p>
              <p>Salary:{job.salary}</p>
            </div>
            <div>
              <Link href={`job-list/${job.id}`}>
              <Button>View</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 border h-screen"></div>
    </div>
  );
};

export default JobList;
