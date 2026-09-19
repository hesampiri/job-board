import { prisma } from "@/prisma";
import Image from "next/image";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmarkButton";
import AddApplicationButton from "@/components/addApplicationButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { id: slug },
    include: { company: true },
  });

  if (!job) {
    return { title: "Job not found" };
  }

  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.description.slice(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company.name}`,
      description: job.description.slice(0, 160),
      type: "website",
    },
  };
}

const ViewJobpage = async ({ params }: Props) => {
  const session = await auth();
  const userRole = session?.user.role;
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: {
      id: slug,
    },
    include: {
      company: true,
    },
  });

  if (!job) {
    notFound();
  }

  const getPostTime = (date: Date) => {
    const now = new Date();
    const postTime = new Date(date);
    const diff = Math.floor((now.getTime() - postTime.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return postTime.toLocaleDateString();
  };

  return (
    <div className="container mx-auto max-w-[900px]">
      <div className="rounded-2xl border border-hairline bg-surface-1">
        <div className="flex items-center gap-4 border-b border-hairline p-6">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-hairline bg-surface-2">
            <Image
              alt={`${job.company.name} logo`}
              src={job.company.logoUrl || "/images/default-cmpny.jpg"}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium capitalize">
              {job.company.name}
            </p>
            <p className="truncate text-sm capitalize text-ink-subtle">
              {job.company.description}
            </p>
          </div>
          <BookmarkButton jobId={job.id} />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">
            {job.title}
          </h1>
          <pre className="mt-5 max-w-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-ink-muted">
            {job.description}
          </pre>
          <div className="my-8 grid grid-cols-2 gap-y-3 border-y border-hairline py-6 text-sm">
            <p className="text-ink-subtle">Location</p>
            <p className="capitalize">{job.location}</p>
            <p className="text-ink-subtle">Type</p>
            <p className="capitalize">{job.type.replace("_", " ")}</p>
            <p className="text-ink-subtle">Salary</p>
            <p>${job.salary.toLocaleString()}</p>
          </div>
          <p className="text-xs text-ink-tertiary">
            Posted {getPostTime(job.createdAt)}
          </p>
        </div>
        <div className="border-t border-hairline p-6">
          <AddApplicationButton jobId={job.id} userRole={userRole} />
        </div>
      </div>
    </div>
  );
};

export default ViewJobpage;
