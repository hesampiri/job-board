import AddJobForm from "@/froms/addJobForm";
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
    <div className="container mx-auto p-4 ">
      <AddJobForm type="edit" currentJob={job!} />
    </div>
  );
};

export default UpdateJobpage;
