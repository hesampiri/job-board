import FilterBar from "@/components/filterBar";
import JobCard from "@/components/jobCard";
import SortBySelect from "@/components/sortBySelect";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filterform from "@/froms/filterform";
import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";
import { CircleAlert } from "lucide-react";

type searchparamsType = {
  type?: string | string[];
  location?: string;
  category?: string;
  sortBy?: string;
  page?: string;
};

export default async function JobListPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const { type, location, category, sortBy, page = 1 } = searchParams || {};

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

  const pageSize = 10;
  const skip = ((Number(page) || 1) - 1) * pageSize;

  const jobs = await prisma.job.findMany({
    skip,
    take: pageSize,
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

  const alljobs = await prisma.job.count();
  const currentpage = Number(page);
  console.log(currentpage);

  const totalPages = Math.ceil(alljobs / pageSize);
  const prevPage = currentpage > 1 ? currentpage - 1 : currentpage;
  const nextPage = currentpage < totalPages ? currentpage + 1 : currentpage;
  return (
    <div className="container mx-auto min-h-screen overflow-y-auto">
      <div className="flex sm:py-5 p-2  items-center">
        <p className="text-xs text-gray-500 mr-2">Sort By</p>
        <SortBySelect />
        <FilterBar />
      </div>
      {/* <JobList searchValues={searchParams || {}} /> */}
      <div>
        <div className="grid sm:grid-cols-4 gap-2">
          <div className="col-span-3">
            {jobs.length > 0 ? (
              jobs.map((job: any) => (
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
              <div className=" text-center flex items-center pt-44 flex-col gap-3 text-gray-500">
                <CircleAlert />
                <p>No Match Found</p>
              </div>
            )}
          </div>
          <div className="col-span-1 border rounded-sm hidden sm:block">
            <Filterform />
          </div>
        </div>
        <div className="py-5 border-yellow-400">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={prevPage === 1 ? "/job-list" : `?page=${prevPage}`}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={p === 1 ? "/job-list" : `?page=${p}`}
                    isActive={Number(page) === p}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={`?page=${nextPage}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
