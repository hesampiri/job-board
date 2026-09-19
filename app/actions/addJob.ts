"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { z } from "zod";

const AddJobSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["full_time", "part_time", "contract"]),
  category: z.enum([
    "software_development",
    "design",
    "marketing",
    "sales",
    "hr",
    "finance",
    "other",
  ]),
  tags: z.array(z.string()).optional(),
  salary: z.number().int().min(0),
});

export const AddJob = async (values: z.infer<typeof AddJobSchema>) => {
  const session = await auth();
  if (!session?.user) {
    return { message: "You must be signed in", type: "error" };
  }
  if (session.user.role !== "employer") {
    return { message: "Only employers can post jobs", type: "error" };
  }

  const parsed = AddJobSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Invalid input", type: "error" };
  }

  const { title, description, location, type, category, tags, salary } =
    parsed.data;

  try {
    await prisma.job.create({
      data: {
        title,
        description,
        location,
        type,
        category,
        salary,
        companyId: session.user.companyId!,
        tags: {
          create: tags?.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });
    return { message: "Job posted successfully", type: "success" };
  } catch (error) {
    console.error("AddJob error:", error);
    return { message: "Something went wrong", type: "error" };
  }
};
