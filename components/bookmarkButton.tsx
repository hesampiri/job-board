"use client";

import { Bookmark } from "lucide-react";
import { AddBookmark } from "@/app/actions/addBookmark";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BookmarkButton({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  const [fill, setFill] = useState(false);

  const formHandler = async (formdata: FormData) => {
    const bookmark = await AddBookmark(formdata);
    if (bookmark?.type === "success") {
      setFill(true);
      toast.success(bookmark.message);
    } else if (bookmark?.type === "error") toast.error(bookmark.message);
    else if (bookmark?.type === "remove") {
      setFill(false);
      toast.success(bookmark.message);
    }
  };

  return (
    <form action={formHandler} className="ml-auto">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="jobId" value={jobId} />
      <Button type="submit">
        <Bookmark fill={fill ? "red" : ""} />
      </Button>
    </form>
  );
}
