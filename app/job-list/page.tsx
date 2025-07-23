import FilterBar from "@/components/filterBar";
import JobList from "@/components/jobList";
import SortBySelect from "@/components/sortBySelect";

const JobListPage = ({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    location?: string;
    category?: string;
  };
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex sm:py-5 p-2  items-center">
        <SortBySelect/>
        {/* <p className="text-sm text-gray-500">suggestions</p> */}
        <FilterBar />
      </div>
      <JobList searchParams={searchParams || {}} />
    </div>
  );
};

export default JobListPage;
