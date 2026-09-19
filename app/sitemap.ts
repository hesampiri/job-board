import type { MetadataRoute } from "next";
import { prisma } from "@/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await prisma.job.findMany({
    select: { id: true, createdAt: true },
  });

  const jobEntries: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `https://jobly.example.com/job-list/${job.id}`,
    lastModified: job.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://jobly.example.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jobly.example.com/job-list",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...jobEntries,
  ];
}
