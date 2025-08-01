import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className=" overflow-hidden min-h-screen">
      <section className=" z-10 flex flex-col items-center justify-center text-center py-32 px-4 md:px-16">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Discover Your Next Opportunity
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-8">
          Explore thousands of jobs in tech, design, marketing, and more — all
          in one place.
        </p>
        <div className="flex gap-4">
          <Button className="px-6 py-3 text-lg" asChild>
            <Link href={"/job-list"}>Browse Jobs</Link>
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg border-yellow-400 text-yellow-400 border-2"
          >
            <Link href={"/dashboard/employer/add-job"}>Post a Job</Link>
          </Button>
        </div>
      </section>
      <section className=" z-10 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Curated Listings</h3>
            <p className="text-gray-600">
              Find only high-quality and relevant job opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Fast Application</h3>
            <p className="text-gray-600">
              Apply with one click using your saved profile.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Verified Employers</h3>
            <p className="text-gray-600">
              We only allow trusted companies on our platform.
            </p>
          </div>
        </div>
      </section>
      <footer className="text-center py-6 mt-12">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Jobly All rights reserved.
        </p>
      </footer>
    </main>
  );
}
