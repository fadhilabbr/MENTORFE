// ============================================================================
// 🎨 TODO BAGIAN DESAIN & UI: KARTU PRODUK (PRODUCT CARD)
// ============================================================================
// File ini melatih peserta mentoring dalam aspek Frontend UI / Slicing:
// - TODO 1.1: Format harga mentah menjadi Rupiah (Intl.NumberFormat)
// - TODO 1.2: Conditional styling badge status ketersediaan stok
// - TODO 1.3: Visual disabled state pada tombol kurangi stok
// - TODO 1.5: Efek hover kartu dengan transition
// ============================================================================

import { useState } from "react";
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
  // 🎯 TODO 1.1 [DESAIN]: Format Harga ke Rupiah
  // --------------------------------------------------------------------------
  // Format angka mentah menjadi Rupiah memakai Intl.NumberFormat (id-ID, IDR).
  // Contoh hasil: 25000000 tampil "Rp 25.000.000", 0 tampil "Rp 0".
  // Hint: Gunakan objek JavaScript Intl.NumberFormat dengan locale bahasa Indonesia ('id-ID'),
  // konfigurasi style currency 'IDR', dan tanpa angka pecahan desimal (maximumFractionDigits: 0).
  // --------------------------------------------------------------------------
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  // --------------------------------------------------------------------------
  // 🎯 TODO 1.2 [DESAIN]: Badge Stok
  // --------------------------------------------------------------------------
  // Badge hijau jika stock > 0, merah jika 0.
  // Badge juga memuat teks ("Tersedia" / "Habis"), bukan hanya warna.
  // Hint: Gunakan evaluasi kondisi product.stock > 0 untuk menentukan class Tailwind warna badge
  // (misal: hijau saat tersedia, merah saat habis) serta teks labelnya ("Tersedia" atau "Habis").
  // --------------------------------------------------------------------------
  
  const isAda = product.stock > 0;
  const stockBadgeClass = isAda ?
    "bg-green-200 text-green-800" : "bg-red-200 text-red-800"

  const stockBadgeText = isAda ?
    "Tersedia" : "Habis";

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
    /* ------------------------------------------------------------------------
     * 🎯 TODO 1.5 [DESAIN]: Efek Hover Kartu
     * Tambahkan efek hover pada kartu menggunakan Tailwind: hover:shadow-lg dan transition.
     * Hint: Manfaatkan class Tailwind untuk transisi halus dan elevasi bayangan saat kursor diarahkan ke elemen kartu.
     * ------------------------------------------------------------------------ */
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-md transition">
      <div>
        {/* Header Kartu: ID Produk & Badge Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-zinc-400">
            {product.id}
          </span>

          {/* Badge Status Stok (Hasil TODO 1.2) */}
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stockBadgeClass}`}>
            {stockBadgeText}
          </span>
        </div>

        {/* Nama Produk */}
        <h3 className="mt-2.5 text-sm font-semibold text-zinc-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Harga Produk (Hasil TODO 1.1) */}
        <p className="mt-1 text-base font-bold text-zinc-900">
          {formattedPrice}
        </p>
      </div>

      {/* Bagian Bawah: Aksi Cepat PATCH Stok & Tombol Edit/Hapus */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
        {/* Kontrol Cepat Ubah Stok (PATCH) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-500">
            Stok:
          </span>

          {/* ------------------------------------------------------------------
           * 🎯 TODO 1.3 [DESAIN]: Tombol [-] Nonaktif Saat Stok 0
           * Nonaktifkan tombol saat stok 0: gunakan atribut disabled saat product.stock <= 0
           * (atau saat isUpdating), ditambah styling disabled:opacity-30 disabled:cursor-not-allowed.
           * Hint: Berikan kondisi pada atribut disabled (saat stok habis atau sedang updating),
           * lalu atur class opacity dan cursor untuk varian disabled: milik Tailwind.
           * ------------------------------------------------------------------ */}
          <button
            type="button"
            disabled={isUpdating || product.stock <= 0}
            onClick={() => handleStock(-1)}
            title="Kurangi stok 1 (PATCH)"
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            -
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => handleStock(1)}
            title="Tambah stok 1 (PATCH)"
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Tombol Aksi Edit & Hapus */}
        <div className="flex items-center gap-2 font-medium">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="text-zinc-600 hover:text-zinc-900"
          >
            Edit
          </button>
          <span className="text-zinc-300">|</span>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="text-rose-600 hover:text-rose-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
