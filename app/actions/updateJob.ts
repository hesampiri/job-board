"use server"
import { prisma } from "@/prisma";

type jobProp = {
  title: string;
  description: string;
  location: string;
  type: "full_time" | "part_time" | "contract";
  category:
    | "software_development"
    | "design"
    | "marketing"
    | "sales"
    | "hr"
    | "finance"
    | "other";
  tags?: string[];
  salary: number;
};
export const UpdateJob = async (values: jobProp, id: string) => {
  const { title, description, location, type, category, tags, salary  } = values;

  try {
    await prisma.job.update({
      where: {
        id,
      },
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
    console.error("Update error:", error);
    return { message: "somthing went wrong", type: "error" };
  }
};
