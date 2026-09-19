"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-ink-subtle">An unexpected error occurred.</p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
