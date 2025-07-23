"use client";

import { Bookmark } from "lucide-react";
import { useFormState } from "react-dom";
import { AddBookmark } from "@/app/actions/addBookmark";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BookmarkButton({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  const [state, formAction] = useActionState(AddBookmark, null);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (state?.type === "success") {
      setFill(true);
      toast.success(state.message);
    } else if (state?.type === "error") toast.error(state.message);
    else if (state?.type === "remove") {
      setFill(false);
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="ml-auto">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="jobId" value={jobId} />
      <Button type="submit">
        <Bookmark fill={fill ? "red" : ""} />
      </Button>
    </form>
  );
}
