"use server";
import { auth } from "@/auth";
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

export const AddJob = async (values: jobProp) => {
  const session = await auth();
  const userCompanyId = session?.user.companyId;
  const { title, description, location, type, category, tags, salary } = values;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        type,
        category,
        salary,
        companyId: userCompanyId as string,
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
  } catch {
    return { message: "somthing went wrong", type: "error" };
  }
};
