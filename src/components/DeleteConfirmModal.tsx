import React, { useState } from "react";
import { Product } from "@/types/product";
import { TrashIcon, CloseIcon } from "./Icons";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteConfirmModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(product.id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <TrashIcon className="h-6 w-6" />
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Hapus Item Katalog (DELETE)?
          </h3>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Apakah Anda yakin ingin menghapus produk{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              &quot;{product.title}&quot;
            </span>
            ? Tindakan ini akan mengirimkan request HTTP DELETE ke endpoint{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              /api/products/{product.id}
            </code>
            .
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-rose-600/30 hover:bg-rose-700 disabled:opacity-50"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus Produk"}
          </button>
        </div>
      </div>
    </div>
  );
}
