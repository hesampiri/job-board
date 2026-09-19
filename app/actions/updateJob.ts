"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { z } from "zod";

const UpdateJobSchema = z.object({
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

type jobProp = z.infer<typeof UpdateJobSchema>;

export const UpdateJob = async (values: jobProp, id: string) => {
  const session = await auth();
  if (!session?.user) {
    return { message: "You must be signed in", type: "error" };
  }
  if (session.user.role !== "employer") {
    return { message: "Only employers can update jobs", type: "error" };
  }

  const parsed = UpdateJobSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Invalid input", type: "error" };
  }

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return { message: "Job not found", type: "error" };
  }
  if (job.companyId !== session.user.companyId) {
    return { message: "You do not own this job", type: "error" };
  }

  const { title, description, location, type, category, tags, salary } =
    parsed.data;

  try {
    await prisma.job.update({
      where: { id },
      data: {
        title,
        description,
        location,
        type,
        category,
        salary,
        tags: {
          deleteMany: {},
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
    return { message: "Job updated successfully", type: "success" };
  } catch (error) {
    console.error("UpdateJob error:", error);
    return { message: "Something went wrong", type: "error" };
  }
};
