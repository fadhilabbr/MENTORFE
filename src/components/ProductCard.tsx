// ============================================================================
// 🎯 TODO 3: MEMBANGUN KOMPONEN KARTU PRODUK (PRODUCT CARD)
// ============================================================================
// Tujuan:
// Menampilkan kartu katalog yang kaya informasi visual sekaligus menjadi media
// demonstrasi aksi PUT, PATCH, dan DELETE secara langsung bagi pengguna.
//
// Petunjuk Pengerjaan:
// 1. TODO 3.1: Format nilai harga numerik menjadi Rupiah (IDR).
// 2. TODO 3.2: Tampilkan badge status produk (Tersedia vs Habis).
// 3. TODO 3.3: Tambahkan aksi Quick PATCH (Toggle Status & Quick Stock).
// 4. TODO 3.4: Tambahkan tombol aksi Edit (PUT) dan Hapus (DELETE).
// ============================================================================

import React, { useState } from "react";
import { Product } from "@/types/product";
import { PencilIcon, TrashIcon, StarIcon, ToggleIcon } from "./Icons";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onPatchToggleAvailability: (product: Product) => Promise<void>;
  onPatchQuickStock: (product: Product, delta: number) => Promise<void>;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onPatchToggleAvailability,
  onPatchQuickStock,
}: ProductCardProps) {
  const [isPatching, setIsPatching] = useState(false);
  const [isStockUpdating, setIsStockUpdating] = useState(false);

  // --------------------------------------------------------------------------
  // TODO 3.1: Format harga ke format mata uang Rupiah
  // Contoh: 1499000 -> "Rp 1.499.000"
  // --------------------------------------------------------------------------
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  // Handler untuk aksi cepat PATCH: Toggle status ketersediaan
  const handleToggle = async () => {
    setIsPatching(true);
    try {
      await onPatchToggleAvailability(product);
    } finally {
      setIsPatching(false);
    }
  };

  // Handler untuk aksi cepat PATCH: Menambah atau mengurangi stok
  const handleStockChange = async (delta: number) => {
    if (product.stock + delta < 0) return;
    setIsStockUpdating(true);
    try {
      await onPatchQuickStock(product, delta);
    } finally {
      setIsStockUpdating(false);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* Gambar Thumbnail & Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80";
          }}
        />

        {/* Badge Kategori */}
        <span className="absolute top-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {product.category}
        </span>

        {/* --------------------------------------------------------------------
         * TODO 3.2: Badge Status Ketersediaan (Hijau jika true, Merah jika false)
         * -------------------------------------------------------------------- */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-xs ${
            product.isAvailable
              ? "bg-emerald-500/90 text-white"
              : "bg-rose-500/90 text-white"
          }`}
        >
          {product.isAvailable ? "Tersedia" : "Habis"}
        </span>
      </div>

      {/* Konten Card */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating & Stock */}
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>Stok:</span>
            <strong className="text-zinc-800 dark:text-zinc-200">{product.stock}</strong>
          </div>
        </div>

        {/* Judul & Deskripsi */}
        <h3 className="line-clamp-1 text-base font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-zinc-500 dark:text-zinc-400">
          {product.description || "Tidak ada deskripsi produk."}
        </p>

        {/* Harga */}
        <div className="mt-3">
          <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
            {formattedPrice}
          </span>
        </div>

        {/* --------------------------------------------------------------------
         * TODO 3.3: DEMONSTRASI FITUR QUICK PATCH
         * Fitur ini mengirimkan perubahan hanya untuk field tertentu secara parsial
         * -------------------------------------------------------------------- */}
        <div className="mt-3 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/60 p-2 text-xs dark:border-indigo-900/60 dark:bg-indigo-950/30">
          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
            <span>Contoh PATCH Praktis:</span>
            <span className="rounded bg-indigo-100 px-1 text-[10px] uppercase dark:bg-indigo-900">
              Partial Update
            </span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5">
            {/* Quick PATCH A: Toggle Status Tersedia/Habis */}
            <button
              type="button"
              disabled={isPatching}
              onClick={handleToggle}
              title="Kirim PATCH request untuk hanya mengubah field isAvailable"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-indigo-300 bg-white py-1 text-[11px] font-medium text-indigo-700 shadow-2xs hover:bg-indigo-50 disabled:opacity-50 dark:border-indigo-800 dark:bg-zinc-800 dark:text-indigo-200"
            >
              <ToggleIcon className="h-3 w-3" />
              <span>{isPatching ? "Updating..." : product.isAvailable ? "Set Habis" : "Set Tersedia"}</span>
            </button>

            {/* Quick PATCH B: Ubah Stok +/- 1 */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={isStockUpdating || product.stock <= 0}
                onClick={() => handleStockChange(-1)}
                title="PATCH: Kurangi stok 1"
                className="rounded-lg border border-indigo-200 bg-white px-2 py-1 text-[11px] font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                -1
              </button>
              <button
                type="button"
                disabled={isStockUpdating}
                onClick={() => handleStockChange(1)}
                title="PATCH: Tambah stok 1"
                className="rounded-lg border border-indigo-200 bg-white px-2 py-1 text-[11px] font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                +1
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------
         * TODO 3.4: TOMBOL AKSI EDIT (PUT) & HAPUS (DELETE)
         * -------------------------------------------------------------------- */}
        <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-100 active:scale-98 dark:border-zinc-750 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <PencilIcon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Edit (PUT)</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition-all hover:border-rose-300 hover:bg-rose-100 active:scale-98 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50"
            title="Hapus Produk (DELETE)"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
