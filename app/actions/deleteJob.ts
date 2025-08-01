"use server";
import { prisma } from "@/prisma";

const DeleteJob = async (jobId: string) => {
  try {
    await prisma.jobTag.deleteMany({
      where: {
        jobId,
      },
    });

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    return { message: "job deleted", type: "success" };
  } catch (error) {
    console.log("error:", error);
    return { message: "somthing went wrong", type: "error" };
  }
};

export default DeleteJob;
