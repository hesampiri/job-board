import { auth } from "@/auth";
import DashboardJobseeker from "@/components/dashboardJobseeker";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import React from "react";

const JobseekerDashboardPage = async () => {
  const session = await auth();
  const user = session?.user;

  const jobseeker = await prisma.user.findUnique({
    where: { id: user?.id },
    include: {
      bookmarks: {
        include: {
          job: true,
        },
      },
      applications: {
        include: {
          job: true,
        },
      },
    },
  });

  return <DashboardJobseeker userInfo={jobseeker} />;
};

export default JobseekerDashboardPage;
