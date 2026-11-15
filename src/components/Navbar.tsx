import React from "react";
import { PlusIcon } from "./Icons";

interface NavbarProps {
  totalItems: number;
  availableItems: number;
  onOpenCreateModal: () => void;
}

export function Navbar({ totalItems, availableItems, onOpenCreateModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-bold text-white shadow-md shadow-indigo-500/20">
            KN
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              Katalog Store
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Template Belajar CRUD + PATCH Next.js
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Badge Statistik */}
          <div className="hidden items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 md:flex">
            <span>Total: <strong className="text-zinc-900 dark:text-zinc-100">{totalItems}</strong></span>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span>Tersedia: <strong className="text-emerald-600 dark:text-emerald-400">{availableItems}</strong></span>
          </div>

          {/* Tombol Tambah Produk (Trigger POST) */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-all hover:bg-indigo-700 active:scale-95"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Tambah Item</span>
          </button>
        </div>
      </div>
    </header>
  );
}
