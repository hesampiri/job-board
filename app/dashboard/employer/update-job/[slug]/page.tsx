import AddJobForm from "@/forms/addJobForm";
import { prisma } from "@/prisma";

type Params = Promise<{ slug: string }>;

const UpdateJobpage = async (props: { params: Params }) => {
  const { slug } = await props.params;
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
    <div className="container mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-[-0.02em]">
        Edit job
      </h1>
      <div className="rounded-xl border border-hairline bg-surface-1 p-6">
        <AddJobForm type="edit" currentJob={job!} />
      </div>
    </div>
  );
};

export default UpdateJobpage;
