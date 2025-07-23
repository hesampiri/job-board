import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Building2, Clock, Receipt } from "lucide-react";

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
    <div className="sm:p-5 p-2 border w-full flex items-center">
      <div className="relative sm:w-[80px] sm:h-[80px] w-12 h-12 ">
        <Image
          alt="companyLogo"
          src={data.logo || "/images/default-cmpny.jpg"}
          fill
          className="object-cover rounded "
        />
      </div>
      <div className="ml-5">
        <h1 className="font-semibold text-xs sm:text-base">{data.title}</h1>
        <span className="flex items-center text-gray-500">
          <Building2 size={12} />
          <p className="text-xs sm:text-sm capitalize ml-2">{data.companyName}</p>
        </span>
        <span className="flex items-center text-gray-500">
          <Clock size={12} />
          <p className="text-xs sm:text-sm  ml-2">{data.jobType}</p>
        </span>
        <span className="flex items-center text-gray-500">
          <Receipt size={12} />
          <p className="text-xs sm:text-sm  ml-2">salary: ${data.salary.toLocaleString()}</p>
        </span>
      </div>
      <div className="ml-auto">
        <Link href={`job-list/${data.id}`}>
          <Button className="text-xs sm:text-sm sm:h-8 sm:p-4  h-2 p-3">View</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
