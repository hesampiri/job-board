import { prisma } from "@/prisma";
import JobCard from "./jobCard";
import Filterform from "@/froms/filterform";
import { CircleAlert } from "lucide-react";
import FilterBar from "./filterBar";
import { Prisma } from "@prisma/client";

type Props = {
  searchParams: {
    type?: string | string[];
    location?: string;
    category?: string;
    sortBy?: string;
  };
};

const JobList = async ({ searchParams }: Props) => {
  const { type, location, category, sortBy } = searchParams;

  const toArray = (value: string | string[] | undefined) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };
  const typeArray = toArray(type);
  const locArray = toArray(location);
  const catArray = toArray(category);

  const sortOptions = {
    salary: { salary: "desc" },
    latest: { createdAt: "desc" },
  } as const;

  const orderBy: Prisma.JobOrderByWithRelationInput = sortOptions[
    sortBy as keyof typeof sortOptions
  ] ?? { createdAt: "desc" };

  const jobs = await prisma.job.findMany({
    where: {
      ...(typeArray.length > 0 && {
        type:
          typeArray?.length === 1 ? (typeArray[0] as any) : { in: typeArray },
      }),
      ...(locArray.length > 0 && {
        location:
          locArray?.length === 1 ? (locArray[0] as any) : { in: locArray },
      }),
      ...(catArray.length > 0 && {
        category:
          catArray?.length === 1 ? (catArray[0] as any) : { in: catArray },
      }),
    },
    include: {
      company: true,
    },
    orderBy,
  });

  return (
    <div className="grid sm:grid-cols-4 gap-2">
      <div className="col-span-3">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              jobType={job.type}
              logo={job.company.logoUrl}
              companyName={job.company.name}
            />
          ))
        ) : (
          <div className=" text-center flex items-center flex-col gap-3 text-gray-500">
            <CircleAlert />
            <p>No Match Found</p>
          </div>
        )}
      </div>
      <div className="col-span-1 border hidden sm:block">
        <Filterform />
      </div>
    </div>
  );
};

export default JobList;
