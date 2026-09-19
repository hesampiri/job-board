"use client";
import React, { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Filterform from "@/forms/filterForm";
import { Button } from "./ui/button";

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="sm:hidden ml-auto">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="p-"
        variant={"outline"}
        size={"sm"}
        aria-label="Open filters"
      >
        <SlidersHorizontal size={15} />
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed top-0 right-0 z-20 h-screen border-l border-hairline bg-surface-1 transition-all duration-200 ${
          isOpen ? "w-full" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex items-center justify-between border-b border-hairline p-4">
          <h2 className="text-sm font-semibold">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-ink-subtle hover:text-ink"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Filterform />
      </nav>
    </div>
  );
};

export default FilterBar;
