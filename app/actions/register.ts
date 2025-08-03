"use server";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";

type registerProps = {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
  companyName: string;
  description?: string;
  logoUrl?: string;
  website?: string;
};

export const Register = async (values: registerProps) => {
  const {
    email,
    password,
    role,
    companyName,
    description,
    website,
    logoUrl,
    name,
  } = values;

  const userExistance = await prisma.user.findUnique({ where: { email } });

  if (userExistance) {
    return { message: "user already exists", type: "error" };
  }

  const hashedpass = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      role,
      email,
      password: hashedpass,
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

  return { message: "user successfully registered", type: "success", email };
};
