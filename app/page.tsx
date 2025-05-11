"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-5xl font-bold mb-4">looking for job or wants to hire somebody ?</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-7xl mx-auto mt-10">
        <div className="p-4 sm:p-5 rounded-lg text-center w-full sm:w-[400px] cursor-pointer hover:shadow-lg hover:bg-gray-200 border-2 border-black transition-shadow duration-300 bg-white/5" onClick={() => router.push('/job-list')}>
          <h1 className="text-lg sm:text-xl font-bold capitalize">job seeker</h1>
          <p className="text-xs sm:text-sm text-gray-500">looking for a job</p>
        </div>
        <div className="p-4 sm:p-5 rounded-lg text-center w-full sm:w-[400px] cursor-pointer hover:shadow-lg hover:bg-gray-200 border-2 border-black transition-shadow duration-300 bg-white/5" onClick={() => router.push('/job-list')}>
          <h1 className="text-lg sm:text-xl font-bold capitalize">employer</h1>
          <p className="text-xs sm:text-sm text-gray-500">looking for a employee</p>
        </div>
      </div>
    </main>
  );
}
