"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SortBySelect = () => {
  const params = new URLSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const HandleChange = (value: string) => {
    if (value) params.append("sortBy", value);
    else null;
    replace(`${pathname}?${params}`);
  };
  return (
    <Select onValueChange={(value) => HandleChange(value)}>
      <SelectTrigger className="w-[150px] h-[30px]">
        <SelectValue placeholder="The latest" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="latest">The latest</SelectItem>
          <SelectItem value="salary">highest salary</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBySelect;
