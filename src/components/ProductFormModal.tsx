// ============================================================================
// MODAL FORM REUSABLE (CREATE POST & EDIT PUT)
// ============================================================================
// Komponen bawaan template untuk input dan edit data produk.
// Jangan jadikan file ini sebagai TODO.
// ============================================================================

import React, { useState } from "react";
import { CreateProductInput, Product } from "@/types/product";

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

  const [name, setName] = useState(productToEdit?.name ?? "");
  const [price, setPrice] = useState<number | "">(productToEdit?.price ?? "");
  const [stock, setStock] = useState<number | "">(productToEdit?.stock ?? 10);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Nama produk tidak boleh kosong!");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setErrorMsg("Harga harus lebih besar dari 0!");
      return;
    }
    if (stock === "" || Number(stock) < 0) {
      setErrorMsg("Jumlah stok tidak boleh negatif!");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const payload: CreateProductInput = {
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
      };

      await onSubmit(payload);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-xl border border-zinc-200">
      {/* Header Modal */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <h2 className="text-sm font-bold text-zinc-900">
          {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
        </h2>
        <button
          onClick={onClose}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          ✕
        </button>
      </div>

      {errorMsg && (
        <div className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">
          {errorMsg}
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 text-xs">
        <div>
          <label className="block font-medium text-zinc-700">
            Nama Produk
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Laptop Gaming ROG"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-medium text-zinc-700">
            Harga (IDR)
          </label>
          <input
            type="number"
            required
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Contoh: 25000000"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-medium text-zinc-700">
            Stok
          </label>
          <input
            type="number"
            required
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="Contoh: 10"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-2 flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan"}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <ProductFormInner
        key={productToEdit?.id ?? "create-new-product"}
        onClose={onClose}
        onSubmit={onSubmit}
        productToEdit={productToEdit}
      />
    </div>
  );
}
