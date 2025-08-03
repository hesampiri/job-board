import { prisma } from "@/prisma";
import Image from "next/image";
import { auth } from "@/auth";
import { BookmarkButton } from "@/components/bookmarkButton";
import AddApplicationButton from "@/components/addApplicationButton";

const ViewJobpage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  const userRole = session?.user.role;
  const userId = session?.user.id;
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: {
      id: slug,
    },
    include: {
      company: true,
    },
  });

  const getPostTime = (date: Date) => {
    const now = new Date();
    const postTime = new Date(date);
    const diff = Math.floor((now.getTime() - postTime.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return postTime.toLocaleDateString();
  };

  return (
    <div className="mx-auto container">
      <div className="shadow-md shadow-gray-500 max-w-[900px] mx-auto sm:mt-0 mt-10">
        <div className="border p-5 mx-auto flex items-center">
          <div className="relative sm:w-[90px] sm:h-[90px] w-14 h-14">
            <Image
              alt="companyLogo"
              src={job?.company.logoUrl || "/images/default-cmpny.jpg"}
              fill
              className="object-cover rounded"
            />
          </div>
          <div>
            <p className="capitalize ml-5 font-semibold sm:text-base text-sm">
              {job?.company.name}
            </p>
            <p className="capitalize ml-5 text-gray-500 sm:text-base text-sm">
              {job?.company.description}
            </p>
          </div>
          <BookmarkButton userId={userId as string} jobId={job?.id as string} />
        </div>
        <div className="p-5 border mx-auto font-mono">
          <h1 className="text-2xl font-extrabold">{job?.title}</h1>
          <pre className="text-sm whitespace-pre-wrap break-words max-w-full overflow-x-auto mt-5">
            {job?.description}
          </pre>
          <div className="text-sm grid grid-cols-2 my-10">
            <p className="font-semibold">Location:</p>
            <p>{job?.location}</p>
            <p className="font-semibold">Type:</p>
            <p>{job?.type}</p>
            <p className="font-semibold">Salary:</p>
            <p>${job?.salary.toLocaleString()}</p>
          </div>
          <p className="text-gray-500">posted {getPostTime(job!.createdAt)}</p>
        </div>
        <div className="p-5">
          <AddApplicationButton
            jobId={job?.id as string}
            userId={userId}
            userRole={userRole}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewJobpage;
