"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { z } from "zod";

const DeleteJobSchema = z.object({
  jobId: z.string().min(1),
});

const DeleteJob = async (jobId: string) => {
  const session = await auth();
  if (!session?.user) {
    return { message: "You must be signed in", type: "error" };
  }
  if (session.user.role !== "employer") {
    return { message: "Only employers can delete jobs", type: "error" };
  }

  const parsed = DeleteJobSchema.safeParse({ jobId });
  if (!parsed.success) {
    return { message: "Invalid job ID", type: "error" };
  }

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) {
    return { message: "Job not found", type: "error" };
  }
  if (job.companyId !== session.user.companyId) {
    return { message: "You do not own this job", type: "error" };
  }

  try {
    await prisma.jobTag.deleteMany({ where: { jobId } });
    await prisma.job.delete({ where: { id: jobId } });
    return { message: "Job deleted", type: "success" };
  } catch (error) {
    console.error("DeleteJob error:", error);
    return { message: "Something went wrong", type: "error" };
  }
};

export default DeleteJob;
