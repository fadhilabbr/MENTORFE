// ============================================================================
// 🎯 TODO 4: MEMBUAT FORM MODAL REUSABLE (CREATE POST & EDIT PUT)
// ============================================================================
// Tujuan:
// Menyediakan form modal interaktif untuk:
// 1. Menambahkan item baru (Metode POST).
// 2. Memperbarui seluruh data item yang sudah ada (Metode PUT).
//
// Petunjuk Pengerjaan:
// - TODO 4.1: Validasi form (Pastikan nama dan harga terisi valid).
// - TODO 4.2: Bentuk objek payload dengan tipe data `CreateProductInput`.
// - TODO 4.3: Jalankan callback `onSubmit(payload)` dan tutup modal.
// ============================================================================

import React, { useState } from "react";
import { CATEGORIES, Category, CreateProductInput, Product } from "@/types/product";
import { CloseIcon } from "./Icons";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateProductInput) => Promise<void>;
  productToEdit?: Product | null;
}

interface FormInnerProps {
  onClose: () => void;
  onSubmit: (formData: CreateProductInput) => Promise<void>;
  productToEdit?: Product | null;
}

function ProductFormInner({ onClose, onSubmit, productToEdit }: FormInnerProps) {
  const isEditing = Boolean(productToEdit);

  // Inisialisasi state form dari data yang diedit atau nilai default
  const [title, setTitle] = useState(productToEdit?.title ?? "");
  const [description, setDescription] = useState(productToEdit?.description ?? "");
  const [price, setPrice] = useState<number | "">(productToEdit?.price ?? "");
  const [category, setCategory] = useState<Category>((productToEdit?.category as Category) ?? "Elektronik");
  const [imageUrl, setImageUrl] = useState(productToEdit?.imageUrl ?? "");
  const [rating, setRating] = useState<number | "">(productToEdit?.rating ?? 4.5);
  const [stock, setStock] = useState<number | "">(productToEdit?.stock ?? 10);
  const [isAvailable, setIsAvailable] = useState(productToEdit?.isAvailable ?? true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ------------------------------------------------------------------------
    // TODO 4.1: Validasi Input Form
    // Cek apakah judul dan harga sudah diisi dengan benar
    // ------------------------------------------------------------------------
    if (!title.trim()) {
      setErrorMsg("Nama produk wajib diisi!");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setErrorMsg("Harga produk harus berupa angka positif!");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // ----------------------------------------------------------------------
      // TODO 4.2: Konstruksi Payload (CreateProductInput)
      // Gabungkan semua state ke dalam satu objek yang sesuai dengan DTO
      // ----------------------------------------------------------------------
      const payload: CreateProductInput = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        imageUrl:
          imageUrl.trim() ||
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
        rating: Number(rating) || 5,
        stock: Number(stock) || 0,
        isAvailable,
      };

      // ----------------------------------------------------------------------
      // TODO 4.3: Eksekusi submit data (memanggil POST atau PUT di parent)
      // ----------------------------------------------------------------------
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
      {/* Header Modal */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {isEditing ? "Edit Produk (Metode PUT)" : "Tambah Produk Baru (Metode POST)"}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isEditing
              ? "Memperbarui seluruh data item katalog."
              : "Mengirimkan data payload ke server untuk dibuatkan ID baru."}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          {errorMsg}
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 text-xs">
        <div>
          <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
            Nama Produk <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Mechanical Keyboard RGB"
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
              Kategori <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
              Harga (IDR) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Contoh: 250000"
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
              Jumlah Stok
            </label>
            <input
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
              Rating (1 - 5)
            </label>
            <input
              type="number"
              step="0.1"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
            URL Gambar (Unsplash atau link gambar langsung)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-zinc-700 dark:text-zinc-300">
            Deskripsi Produk
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tuliskan detail spesifikasi produk..."
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-white resize-none"
          />
        </div>

        {/* Checkbox Status Tersedia */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="isAvailableCheckbox"
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700"
          />
          <label htmlFor="isAvailableCheckbox" className="font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
            Produk tersedia untuk dibeli (Available)
          </label>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : isEditing ? "Perbarui (PUT)" : "Simpan (POST)"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  productToEdit,
}: ProductFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <ProductFormInner
        key={productToEdit?.id ?? "create-new-product"}
        onClose={onClose}
        onSubmit={onSubmit}
        productToEdit={productToEdit}
      />
    </div>
  );
}
