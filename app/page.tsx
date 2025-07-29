"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen p-4 flex justify-center">
      <div className="flex flex-col gap-5 items-center py-24">
        <h1 className="capitalize font-bold text-6xl">
          find your dream <span className="text-yellow-400">job</span>
        </h1>
        <p className="text-gray-500">
          Discover top jobs, connect with leading companies, and take the next
          step in your career. Whether you're hiring or job hunting — we make it
          simple, fast, and effective.
        </p>
        <div className="flex gap-2">
          <Button>Explore Jobs</Button>
          <Button
            className="text-yellow-400 border-yellow-400"
            variant={"outline"}
          >
            Signup
          </Button>
        </div>
      </div>
    </main>
  );
}
