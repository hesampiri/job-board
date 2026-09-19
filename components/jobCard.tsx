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
  companyName: string | undefined;
};

const JobCard = (data: JobInfo) => {
  return (
    <div className="mt-2 flex w-full flex-col items-center gap-4 rounded-xl border border-hairline bg-surface-1 p-4 transition-colors hover:border-hairline-strong sm:flex-row">
      <Suspense fallback={<Skeleton className="h-[56px] w-[56px]" />}>
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-2">
          <Image
            alt={`${data.companyName} logo`}
            src={data.logo || "/images/default-cmpny.jpg"}
            fill
            className="object-cover"
          />
        </div>
      </Suspense>
      <div className="w-full min-w-0 sm:w-auto">
        <h2 className="truncate text-[15px] font-medium text-ink">
          {data.title}
        </h2>
        <span className="mt-0.5 flex items-center text-ink-subtle">
          <Building2 size={12} />
          <p className="ml-1.5 text-xs capitalize">{data.companyName}</p>
        </span>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink-muted">
            ${data.salary.toLocaleString()}
          </span>
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium capitalize text-ink-muted">
            {data.jobType.replace("_", " ")}
          </span>
        </div>
      </div>
      <div className="ml-auto w-full shrink-0 sm:w-auto">
        <Link href={`/job-list/${data.id}`}>
          <Button size="sm" variant="secondary" className="w-full sm:w-auto">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
