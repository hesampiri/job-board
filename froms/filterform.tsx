"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type FilterParams = {
  type: string[];
  location: string[];
  category: string[];
};

const Filterform = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<FilterParams>({
    type: [],
    location: [],
    category: [],
  });

  const jobFilters = {
    jobtypes: ["full_time", "part_time", "contract"],
    jobCategory: [
      "software_development",
      "design",
      "marketing",
      "sales",
      "hr",
      "finance",
      "other",
    ],
    JobLocation: ["remote", "hybrid", "onsite"],
  };

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((v) => params.append(key, v));
    });

    replace(`${pathname}?${params.toString()}`);
  }, [filters]);

  const handlechange = (name: keyof FilterParams, value: string) => {
    setFilters((prev) => {
      const current = prev[name];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  return (
    <div className="flex flex-col text-sm sm:text-base">
      <div className="p-5 space-y-3">
        <h3 className="font-semibold mb-4">Job Type</h3>
        {jobFilters.jobtypes.map((type, idx) => (
          <div key={idx} className="flex items-center gap-2 capitalize">
            <Checkbox
              id={type}
              checked={filters.type.includes(type)}
              onCheckedChange={() => handlechange("type", type)}
            />
            <label htmlFor={type} className="cursor-pointer text-sm">
              {type.replace("_", " ")}
            </label>
          </div>
        ))}
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div className="p-5 space-y-3">
        <h3 className="font-semibold mb-4">Category</h3>
        {jobFilters.jobCategory.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2 capitalize">
            <Checkbox
              id={cat}
              checked={filters.category.includes(cat)}
              onCheckedChange={() => handlechange("category", cat)}
            />
            <label htmlFor={cat} className="cursor-pointer text-sm">
              {cat.replace("_", " ")}
            </label>
          </div>
        ))}
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div className=" p-5 space-y-3">
        <h3 className="font-semibold mb-4">Location</h3>
        {jobFilters.JobLocation.map((loc, idx) => (
          <div key={idx} className="flex items-center gap-2 capitalize">
            <Checkbox
              id={loc}
              checked={filters.location.includes(loc)}
              onCheckedChange={() => handlechange("location", loc)}
            />
            <label htmlFor={loc} className="cursor-pointer text-sm">
              {loc}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filterform;
