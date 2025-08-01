import { auth } from "@/auth";
import Dashboard from "@/components/dashboard";
import { prisma } from "@/prisma";
import React from "react";

const EmployerDashboardPage = async () => {
  const session = await auth();
  const user = session?.user;

  const userInfo = await prisma.user.findUnique({
    where: { id: user?.id },
    include: {
      company: {
        include: {
          jobs: {
            include: {
              applications: {
                include: { user: true },
              },
            },
          },
        },
      },
    },
  });

  return <Dashboard userInfo={userInfo} />;
};

export default EmployerDashboardPage;
