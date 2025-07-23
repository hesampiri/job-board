"use server";

import { prisma } from "@/prisma";

export const AddBookmark = async (prevState: any, formData: FormData) => {
  const userId = formData.get("userId") as string;
  const jobId = formData.get("jobId") as string;

  if (!userId || !jobId) {
    return { type: "error", message: "you need to create a account first" };
  }

  try {
    const existance = await prisma.bookmark.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    if (existance) {
      await prisma.bookmark.delete({
        where: {
          id: existance.id,
        },
      });

      return { message: "bookmark removed", type: "remove" };
    }

    await prisma.bookmark.create({
      data: {
        user: { connect: { id: userId } },
        job: { connect: { id: jobId } },
      },
    });
    return { type: "success", message: "Bookmarked successfully" };
  } catch (err) {
    return { type: "error", message: "Bookmark failed" };
  }
};
