import AddJobForm from "@/forms/addJobForm";

const AddJobpage = () => {
  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-[-0.02em]">
        Post a job
      </h1>
      <div className="rounded-xl border border-hairline bg-surface-1 p-6">
        <AddJobForm type="add" />
      </div>
    </div>
  );
};

export default AddJobpage;
