"use client";
"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import addApplication from "@/app/actions/addApplication";
import { toast } from "sonner";

type Props = {
  jobId: string;
  userRole: string | undefined;
};

const AddApplicationButton = ({ jobId, userRole }: Props) => {
  const [loading, setLoading] = useState(false);

  const clickHandle = async (jobId: string) => {
    setLoading(true);
    const application = await addApplication(jobId);
    setLoading(false);
    if (application.type === "error") {
      toast.error(application.message);
    } else {
      toast.success(application.message);
    }
  };

  return (
    <Button
      onClick={() => clickHandle(jobId)}
      className="w-full"
      disabled={userRole === "employer" || loading}
    >
      {loading
        ? "Sending..."
        : userRole === "jobseeker" || !userRole
          ? "Send your application"
          : "Only jobseekers can send application"}
    </Button>
  );
};

export default AddApplicationButton;
