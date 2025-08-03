import { CircleAlert } from "lucide-react";


const Unauthorizedpage = () => {
  return (
    <div className="container mx-auto text-center text-gray-500 font-semibold flex items-center flex-col gap-2 pt-44 text-sm sm:text-base ">
      <CircleAlert size={45} />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorizedpage;
