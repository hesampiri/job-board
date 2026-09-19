"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const AddBookmark = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user) {
    return { type: "error", message: "You need to sign in first" };
  }

  const userId = session.user.id;
  const jobId = formData.get("jobId") as string;

  if (!jobId) {
    return { type: "error", message: "Missing job ID" };
  }

  try {
    const existing = await prisma.bookmark.findFirst({
      where: { jobId, userId },
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      return { message: "Bookmark removed", type: "remove" };
    }

    await prisma.bookmark.create({
      data: {
        user: { connect: { id: userId } },
        job: { connect: { id: jobId } },
      },
    });
    return { type: "success", message: "Bookmarked successfully" };
  } catch (error) {
    console.error("AddBookmark error:", error);
    return { type: "error", message: "Bookmark failed" };
  }
};
