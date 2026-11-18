import React from "react";

interface NavbarProps {
  totalItems: number;
  onOpenCreateModal: () => void;
}

export function Navbar({ totalItems, onOpenCreateModal }: NavbarProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-base font-bold text-zinc-900">
            Katalog Produk
          </h1>
          <p className="text-xs text-zinc-500">
            {totalItems} total produk
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-zinc-800"
        >
          + Tambah Produk
        </button>
      </div>
    </header>
  );
}
