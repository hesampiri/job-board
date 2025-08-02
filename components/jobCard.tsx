import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type JobInfo = {
  id: string;
  title: string;
  salary: number;
  jobType: string;
  logo?: string | null;
  companyName: String;
};

const JobCard = (data: JobInfo) => {
  return (
    <div className="sm:p-5 p-2 border rounded-sm w-full flex flex-col sm:flex-row space-y-5 sm:space-y-0 items-center mt-1">
      <Suspense  fallback={<Skeleton className="h-[80px] w-[80px]"/>}>
        <div className="relative sm:w-[80px] sm:h-[80px] w-24 h-24 ">
          <Image
            alt="companyLogo"
            src={data.logo || "/images/default-cmpny.jpg"}
            fill
            className="object-cover rounded "
          />
        </div>
      </Suspense>
      <div className="ml-5 w-full sm:w-auto">
        <h1 className="font-semibold text-xs sm:text-base">{data.title}</h1>
        <span className="flex items-center text-gray-500">
          <Building2 size={12} />
          <p className="text-xs sm:text-sm capitalize ml-2">
            {data.companyName}
          </p>
        </span>
        <div className="flex mt-1 gap-2">
          <span className="bg-yellow-100 rounded block text-yellow-500 text-center sm:text-sm text-xs font-semibold py-0.5 px-3">
            <p>${data.salary.toLocaleString()}</p>
          </span>
          <span className="bg-blue-100 rounded block text-blue-500 text-center sm:text-sm text-xs font-semibold py-0.5 px-3 capitalize">
            <p>{data.jobType.replace("_", " ")}</p>
          </span>
        </div>
      </div>
      <div className="ml-auto w-full sm:w-auto">
        <Link href={`job-list/${data.id}`}>
          <Button size={"lg"} className="text-xs sm:text-sm w-full">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
