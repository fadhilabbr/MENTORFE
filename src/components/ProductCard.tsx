// ============================================================================
// 🎨 TODO BAGIAN DESAIN & UI: KARTU PRODUK (PRODUCT CARD)
// ============================================================================
// File ini melatih peserta mentoring dalam aspek Frontend UI / Slicing:
// 1. TODO 1.1 [DESIGN]: Formatting data numerik ke mata uang Rupiah
// 2. TODO 1.2 [DESIGN]: Conditional styling badge status ketersediaan stok
// 3. TODO 1.3 [DESIGN]: Handling interaksi & visual state tombol disabled
// ============================================================================

import React, { useState } from "react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onPatchQuickStock: (product: Product, delta: number) => Promise<void>;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onPatchQuickStock,
}: ProductCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // --------------------------------------------------------------------------
  // 🎯 TODO 1.1 [DESIGN]: Format Harga ke Mata Uang Rupiah (IDR)
  // --------------------------------------------------------------------------
  // Masalah:
  // Data harga dari API berupa angka mentah: 25000000.
  // Jika hanya ditulis "Rp 25000000", tampilannya kurang profesional bagi pengguna.
  //
  // Tugas Kamu:
  // Ubah baris di bawah menggunakan `Intl.NumberFormat` agar tampil rapi:
  // "Rp 25.000.000"
  //
  // Hint:
  // new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  //   maximumFractionDigits: 0
  // }).format(product.price)
  // --------------------------------------------------------------------------
  // 👇 GANTI KODE DI BAWAH INI (TODO 1.1):
  const formattedPrice = `Rp ${product.price}`;

  // --------------------------------------------------------------------------
  // 🎯 TODO 1.2 [DESIGN]: Conditional Styling Status Stok
  // --------------------------------------------------------------------------
  // Tugas Kamu:
  // Buat variabel class styling untuk badge stok:
  // - Jika stok > 0  : background hijau lembut, teks hijau ("Tersedia")
  // - Jika stok == 0 : background merah lembut, teks merah ("Stok Habis")
  // --------------------------------------------------------------------------
  const isAvailable = product.stock > 0;
  // 👇 TULIS KODE CONDITIONAL CLASS TODO 1.2 DI SINI:
  const stockBadgeClass = isAvailable
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400"
    : "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400";

  const handleStock = async (delta: number) => {
    if (product.stock + delta < 0) return;
    setIsUpdating(true);
    try {
      await onPatchQuickStock(product, delta);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        {/* Header Kartu: ID Produk & Badge Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-zinc-400 dark:text-zinc-500">
            {product.id}
          </span>

          {/* Badge Status Stok (Hasil TODO 1.2) */}
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stockBadgeClass}`}>
            {isAvailable ? `Stok: ${product.stock}` : "Stok Habis"}
          </span>
        </div>

        {/* Nama Produk */}
        <h3 className="mt-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
          {product.name}
        </h3>

        {/* Harga Produk (Hasil TODO 1.1) */}
        <p className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
          {formattedPrice}
        </p>
      </div>

      {/* Bagian Bawah: Aksi Cepat PATCH Stok & Tombol Edit/Hapus */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800">
        {/* Kontrol Cepat Ubah Stok (PATCH) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Stok:
          </span>

          {/* ------------------------------------------------------------------
           * 🎯 TODO 1.3 [DESIGN]: Visual State Tombol Disabled
           * Tombol '-' harus disabled dan tampak pudar (opacity rendah) jika stok == 0
           * ------------------------------------------------------------------ */}
          <button
            type="button"
            disabled={isUpdating || product.stock <= 0}
            onClick={() => handleStock(-1)}
            title="Kurangi stok 1 (PATCH)"
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            -
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => handleStock(1)}
            title="Tambah stok 1 (PATCH)"
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            +
          </button>
        </div>

        {/* Tombol Aksi Edit & Hapus */}
        <div className="flex items-center gap-2 font-medium">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Edit
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
