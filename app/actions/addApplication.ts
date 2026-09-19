"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

const addApplication = async (jobId: string) => {
  const session = await auth();
  if (!session?.user) {
    return { message: "You need to sign in first", type: "error" };
  }

  const userId = session.user.id;

  if (!jobId) {
    return { message: "Missing job ID", type: "error" };
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
    console.error("addApplication error:", error);
    return { message: "Something went wrong", type: "error" };
  }
};

export default addApplication;
