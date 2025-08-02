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
    sortBy?: string;
  };
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex sm:py-5 p-2  items-center">
        <p className="text-xs text-gray-500 mr-2">Sort By</p>
        <SortBySelect />
        <FilterBar />
      </div>
      <JobList searchValues={searchParams || {}} />
      
    </div>
  );
};

export default JobListPage;
