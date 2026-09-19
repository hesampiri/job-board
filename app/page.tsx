import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/prisma";
import { ArrowRight, Building2 } from "lucide-react";
import { CategoryType } from "@prisma/client";

export const dynamic = "force-dynamic";

const categoryLabels: Record<CategoryType, string> = {
  software_development: "Software Development",
  design: "Design",
  marketing: "Marketing",
  sales: "Sales",
  hr: "HR",
  finance: "Finance",
  other: "Other",
};

export default async function Home() {
  const [jobs, jobCount, companyCount, categoryGroups] = await Promise.all([
    prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { company: true },
    }),
    prisma.job.count(),
    prisma.company.count(),
    prisma.job.groupBy({ by: ["category"], _count: { _all: true } }),
  ]);

  const counts = new Map(
    categoryGroups.map((group) => [group.category, group._count._all]),
  );
  const categories = Object.entries(categoryLabels) as [CategoryType, string][];

  const stats = [
    { value: jobCount, label: "Open roles" },
    { value: companyCount, label: "Companies hiring" },
    { value: categoryGroups.length, label: "Categories" },
  ];

  return (
    <div className="overflow-hidden">
      <section className="container mx-auto px-6 pt-16 pb-20 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[13px] font-medium tracking-[0.4px] text-ink-subtle">
              The job board for builders
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-[72px]">
              Open roles from companies that are actually hiring.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-subtle">
              Browse engineering, design, marketing, and more. Apply in a
              minute and track every application from one dashboard.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/job-list">
                  Browse jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard/employer/add-job">Post a job</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-surface-1 p-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="text-sm font-medium text-ink">Latest roles</span>
              <span className="font-mono text-[11px] text-ink-tertiary">
                jobly.app/job-list
              </span>
            </div>

            <div className="mt-2 space-y-0.5">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/job-list/${job.id}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-surface-2 text-ink-subtle">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {job.title}
                      </p>
                      <p className="truncate text-xs text-ink-subtle">
                        {job.company.name} · {job.location}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-medium text-ink-muted">
                        ${job.salary.toLocaleString()}
                      </p>
                      <p className="text-[11px] capitalize text-ink-tertiary">
                        {job.type.replace("_", " ")}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-2 py-8 text-center text-sm text-ink-subtle">
                  No roles posted yet.
                </p>
              )}
            </div>

            <Link
              href="/job-list"
              className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-hairline py-2 text-xs font-medium text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink"
            >
              View all {jobCount} roles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid divide-y divide-hairline overflow-hidden rounded-xl border border-hairline bg-surface-1 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8">
              <p className="text-4xl font-semibold tracking-[-0.03em]">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-ink-subtle">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <p className="text-[13px] font-medium tracking-[0.4px] text-ink-subtle">
          Browse
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          Roles by category
        </h2>
        <p className="mt-2 max-w-xl text-ink-subtle">
          Jump straight to the work you do. Every listing is a live opening
          from a company on Jobly.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([value, label]) => (
            <Link
              key={value}
              href={`/job-list?category=${value}`}
              className="flex items-center justify-between rounded-xl border border-hairline bg-surface-1 px-4 py-4 transition-colors hover:border-hairline-strong hover:bg-surface-2"
            >
              <span className="text-sm font-medium text-ink">{label}</span>
              <span className="font-mono text-xs text-ink-tertiary">
                {counts.get(value) ?? 0}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-hairline bg-surface-1 px-8 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
              Hiring? Post a role.
            </h2>
            <p className="mt-2 text-ink-subtle">
              Reach builders actively looking for their next move.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard/employer/add-job">Post a job</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/job-list">Browse jobs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
