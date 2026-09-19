"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter } from "next/navigation";

const SortBySelect = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const HandleChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Select onValueChange={(value) => HandleChange(value)}>
      <SelectTrigger className="h-9 w-[150px] border-hairline bg-surface-1 text-ink">
        <SelectValue placeholder="The latest" />
      </SelectTrigger>
      <SelectContent className="border-hairline bg-surface-2">
        <SelectGroup>
          <SelectItem value="latest">The latest</SelectItem>
          <SelectItem value="salary">Highest salary</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBySelect;
