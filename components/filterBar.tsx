"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, SlidersHorizontal, X } from "lucide-react";
import Filterform from "@/froms/filterform";
import { Button } from "./ui/button";

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sm:hidden ml-auto">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="p-"
        variant={"outline"}
        size={"sm"}
      >
        <SlidersHorizontal size={15} />
      </Button>
      <nav
        className={`fixed top-0 right-0 h-screen transition-all duration-200 ${
          isOpen ? "w-full" : "w-0"
        } overflow-hidden z-10 bg-black text-white `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <Filterform />
      </nav>
    </div>
  );
};

export default FilterBar;
