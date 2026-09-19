"use client";

import { Bookmark } from "lucide-react";
import { AddBookmark } from "@/app/actions/addBookmark";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BookmarkButton({
  jobId,
}: {
  jobId: string;
}) {
  const [fill, setFill] = useState(false);
  const [loading, setLoading] = useState(false);

  const formHandler = async (formdata: FormData) => {
    setLoading(true);
    const bookmark = await AddBookmark(formdata);
    setLoading(false);
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
      <input type="hidden" name="jobId" value={jobId} />
      <Button
        type="submit"
        disabled={loading}
        variant="secondary"
        size="icon"
        aria-label="Bookmark job"
      >
        <Bookmark
          className={fill ? "text-primary" : ""}
          fill={fill ? "currentColor" : "none"}
        />
      </Button>
    </form>
  );
}
