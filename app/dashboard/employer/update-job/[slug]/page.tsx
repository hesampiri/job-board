import AddJobForm from "@/froms/addJobForm";
import { prisma } from "@/prisma";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const UpdateJobpage = async ({ params }: Props) => {
  const { slug } = params;
  const job = await prisma.job.findUnique({
    where: {
      id: slug,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto p-4 ">
      <AddJobForm type="edit" currentJob={job!} />
    </div>
  );
};

export default UpdateJobpage;
