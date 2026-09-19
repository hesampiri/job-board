"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search jobs..."
        aria-label="Search jobs"
        className="h-[30px] w-[180px] sm:w-[240px]"
      />
      <Button type="submit" size="sm" aria-label="Search">
        <Search size={15} />
      </Button>
    </form>
  );
};

export default SearchInput;
