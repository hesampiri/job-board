"use server";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    role: z.enum(["jobseeker", "employer"]),
    companyName: z.string().optional(),
    description: z.string().optional(),
    logoUrl: z.string().url().optional(),
    website: z.string().url().optional(),
  })
  .refine((data) => data.role !== "employer" || data.companyName, {
    message: "Company name is required for employers",
    path: ["companyName"],
  });

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const parsed = RegisterSchema.safeParse(values);
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message ?? "Invalid input";
    return { message: msg, type: "error" };
  }

  const {
    email,
    password,
    role,
    companyName,
    description,
    website,
    logoUrl,
    name,
  } = parsed.data;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return { message: "User already exists", type: "error" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      role,
      email,
      password: hashedPassword,
      ...(role === "employer" && {
        company: {
          create: {
            name: companyName!,
            description,
            website,
            logoUrl,
          },
        },
      }),
    },
  });

  return { message: "Registration successful", type: "success", email };
};
