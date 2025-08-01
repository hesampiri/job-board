"use server"
import { prisma } from "@/prisma";

const addApplication = async (jobId: string, userId: string | undefined) => {
  if (!userId || !jobId) {
    return { message: "You need to sign in first", type: "error" };
  }

  try {
    const existing = await prisma.application.findFirst({
      where: { userId, jobId },
    });

    if (existing) {
      return { message: "You already applied to this job", type: "info" };
    }

    await prisma.application.create({
      data: {
        user: { connect: { id: userId } },
        job: { connect: { id: jobId } },
      },
    });

    return { message: "Application sent", type: "success" };
  } catch (error) {
    console.error("Application error:", error);
    return { message: "Something went wrong", type: "error" };
  }
};

export default addApplication;
