import FilterBar from "@/components/filterBar";
import JobCard from "@/components/jobCard";
import SortBySelect from "@/components/sortBySelect";
import SearchInput from "@/components/searchInput";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filterform from "@/forms/filterForm";
import { prisma } from "@/prisma";
import { CategoryType, JobType, Prisma } from "@prisma/client";
import { CircleAlert } from "lucide-react";

type jobType = {
  id: string;
  salary: number;
  title: string;
  type: JobType;
  company?: {
    logoUrl: string | null;
    name: string;
  };
};

type searchparamsType = Promise<{
  type?: string | string[];
  location?: string;
  category?: string;
  sortBy?: string;
  page?: string;
  q?: string;
}>;

export default async function JobListPage(props:{searchParams:searchparamsType}){
  const  { type, location, category, sortBy, page = "1", q } =  await props.searchParams || {};

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

  const where: Prisma.JobWhereInput = {
    ...(q && {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
    ...(typeArray.length > 0 && {
      type:
        typeArray?.length === 1
          ? (typeArray[0] as JobType)
          : { in: typeArray as JobType[] },
    }),
    ...(locArray.length > 0 && {
      location:
        locArray?.length === 1 ? (locArray[0] as string) : { in: locArray },
    }),
    ...(catArray.length > 0 && {
      category:
        catArray?.length === 1
          ? (catArray[0] as CategoryType)
          : { in: catArray as CategoryType[] },
    }),
  };

  const jobs = await prisma.job.findMany({
    skip,
    take: pageSize,
    where,
    include: {
      company: true,
    },
    orderBy,
  });

  const alljobs = await prisma.job.count({ where });
  const currentpage = Number(page);

  const totalPages = Math.ceil(alljobs / pageSize);
  const prevPage = currentpage > 1 ? currentpage - 1 : currentpage;
  const nextPage = currentpage < totalPages ? currentpage + 1 : currentpage;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type) {
      const arr = toArray(type);
      arr.forEach((v) => params.append("type", v));
    }
    if (location) {
      const arr = toArray(location);
      arr.forEach((v) => params.append("location", v));
    }
    if (category) {
      const arr = toArray(category);
      arr.forEach((v) => params.append("category", v));
    }
    if (sortBy) params.set("sortBy", sortBy);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/job-list?${qs}` : "/job-list";
  };

  return (
    <div className="container mx-auto min-h-screen px-2">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">
            Open roles
          </h1>
          <p className="mt-1 text-sm text-ink-subtle">
            {alljobs} {alljobs === 1 ? "job" : "jobs"} found
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-surface-1 p-3">
          <SearchInput />
          <p className="ml-auto text-xs text-ink-subtle">Sort by</p>
          <SortBySelect />
          <FilterBar />
        </div>
      </div>
      <div>
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="sm:col-span-3">
            {jobs.length > 0 ? (
              jobs.map((job: jobType) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  salary={job.salary}
                  jobType={job.type}
                  logo={job.company?.logoUrl}
                  companyName={job.company?.name}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-3 pt-32 text-center text-ink-subtle">
                <CircleAlert />
                <p>No jobs match your search</p>
              </div>
            )}
          </div>
          <div className="col-span-1 hidden rounded-xl border border-hairline bg-surface-1 sm:block">
            <Filterform />
          </div>
        </div>
        <div className="py-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={buildHref(prevPage)} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={buildHref(p)}
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
                <PaginationNext href={buildHref(nextPage)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
