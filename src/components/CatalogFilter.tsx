import React from "react";
import { SearchIcon } from "./Icons";
import { CATEGORIES } from "@/types/product";

interface CatalogFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  availabilityFilter: "all" | "available" | "unavailable";
  setAvailabilityFilter: (f: "all" | "available" | "unavailable") => void;
}

export function CatalogFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  availabilityFilter,
  setAvailabilityFilter,
}: CatalogFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
            <SearchIcon className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk atau deskripsi katalog..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-750 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-500 dark:focus:bg-zinc-900"
          />
        </div>

        {/* Filter Ketersediaan (Dropdown / Pill) */}
        <div className="flex items-center gap-1.5 self-start rounded-xl bg-zinc-100 p-1 text-xs font-medium dark:bg-zinc-800 sm:self-auto">
          <button
            type="button"
            onClick={() => setAvailabilityFilter("all")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              availabilityFilter === "all"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setAvailabilityFilter("available")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              availabilityFilter === "available"
                ? "bg-white text-emerald-600 shadow-xs dark:bg-zinc-700 dark:text-emerald-400 font-semibold"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Tersedia
          </button>
          <button
            type="button"
            onClick={() => setAvailabilityFilter("unavailable")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              availabilityFilter === "unavailable"
                ? "bg-white text-rose-600 shadow-xs dark:bg-zinc-700 dark:text-rose-400 font-semibold"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Habis
          </button>
        </div>
      </div>

      {/* Kategori Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-zinc-500 dark:text-zinc-400">Kategori:</span>
        <button
          type="button"
          onClick={() => setSelectedCategory("Semua")}
          className={`shrink-0 rounded-full px-3 py-1 transition-all ${
            selectedCategory === "Semua"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          Semua
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 rounded-full px-3 py-1 transition-all ${
              selectedCategory === cat
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
