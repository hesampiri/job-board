"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import addApplication from "@/app/actions/addApplication";
import { toast } from "sonner";

type Props = {
  userId: string | undefined;
  jobId: string;
  userRole: string | undefined;
};

const AddApplicationButton = ({ jobId, userId, userRole }: Props) => {
  const clickHandle = async (jobId: string, userId: string | undefined) => {
    const application = await addApplication(jobId, userId);
    if (application.type === "error") {
      toast.error(application.message);
    } else {
      toast.success(application.message);
    }
  };

  return (
    <Button
      onClick={() => clickHandle(jobId, userId)}
      className="w-full"
      disabled={userRole === "employer"}
    >
      {userRole === "jobseeker" || !userId
        ? "Send your application"
        : "Only jobseekers can send application"}
    </Button>
  );
};

export default AddApplicationButton;
