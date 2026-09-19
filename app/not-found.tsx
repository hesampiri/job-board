import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-xl text-ink-subtle">Page not found</p>
      <p className="text-ink-tertiary">The page you are looking for does not exist.</p>
      <div className="flex gap-3 mt-4">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/job-list">Browse jobs</Link>
        </Button>
      </div>
    </div>
  );
}
