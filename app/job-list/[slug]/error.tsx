"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Job detail error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-bold">Could not load job</h2>
      <p className="text-ink-subtle">Something went wrong loading this job listing.</p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
        <Button asChild>
          <Link href="/job-list">Browse jobs</Link>
        </Button>
      </div>
    </div>
  );
}
