import { useState } from "react";
import { Product } from "@/types/product";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl border border-zinc-200">
        <h3 className="text-sm font-bold text-zinc-900">
          Hapus Produk?
        </h3>
        <p className="mt-2 text-xs text-zinc-500">
          Apakah kamu yakin ingin menghapus{" "}
          <strong className="text-zinc-800">
            &quot;{product.name}&quot;
          </strong>
          ? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
