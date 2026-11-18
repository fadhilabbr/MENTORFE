// ============================================================================
// 🎯 TEMPLATE MENTORING FRONTEND: FILKOM STORE (INVENTORY DASHBOARD)
// ============================================================================
// Urutan Pengerjaan Peserta:
// 1. Fase 1 - Desain UI (ProductCard.tsx & page.tsx: TODO 1.1, 1.2, 1.3, 1.4, 1.5)
// 2. Fase 2 - Consume API (page.tsx: TODO 2, lalu TODO 5, 6, 3, 4)
// ============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { CreateProductInput, Product } from "@/types/product";
import { API_BASE_URL, getApiHeaders } from "@/config/api";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormModal } from "@/components/ProductFormModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Toast, ToastMessage } from "@/components/Toast";

export default function CatalogPage() {
  // 1. State Data Produk
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 2. State Modal (Form & Konfirmasi Hapus)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // 3. State Toast Feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 2: loadProducts() GET
  // Tugas: Ambil daftar produk dari server dan simpan ke state products.
  // Skeleton tampil saat menunggu (isLoading = true), empty state tampil jika daftar kosong.
  // Hint: Gunakan fetch(API_BASE_URL, { headers: getApiHeaders() }), periksa response.ok,
  // tangani error dalam try/catch, dan tampilkan notifikasi via addToast jika gagal.
  // --------------------------------------------------------------------------
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try{
      const res = await fetch(API_BASE_URL, {
        headers: getApiHeaders(),
      });

      if(!res.ok){
        throw new Error(`HTTP Error ${res.status}: Gagal memuat data dari server`);
      }

      const json = await res.json();
      setProducts(json.data || []);
    } catch (err: unknown) {
      const Message = err instanceof Error ? err.message : "gagal memuat";
      setFetchError(Message);
      addToast({
        type: "error",
        title: "Gagal Mengambil Data",
        detail: Message,
        methodBadge: "GET",
      });
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    // Beri jeda asynchronous pada placeholder agar aman dieksekusi saat mount
    const timer = setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadProducts]);

  // --------------------------------------------------------------------------
  // 🎯 TODO 5: handlePatchQuickStock(product, delta) PATCH
  // Tugas: Ubah stok produk secara cepat (+ / -). Kirim { stock: newStock }.
  // Jangan kirim request jika hasilnya di bawah 0 (newStock < 0).
  // Setelah berhasil, perbarui tampilan antarmuka (muat ulang lewat loadProducts() atau ubah state products).
  // Hint: fetch(`${API_BASE_URL}/${product.id}`, { method: "PATCH", headers: getApiHeaders(), body: JSON.stringify({ stock: newStock }) })
  // --------------------------------------------------------------------------
  const handlePatchQuickStock = async (product: Product, delta: number) => {
    const newStock = product.stock + delta;
    if (newStock < 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${product.id}`, {
        method: "PATCH",
        headers: getApiHeaders(),
        body: JSON.stringify({ stock: newStock }),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memperbarui stok`);
      }

      const json = await res.json();
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? json.data : item))
      );

      addToast({
        type: "success",
        title: "Stok Berhasil Diperbarui",
        detail: `Stok "${product.name}" sekarang: ${newStock}`,
        methodBadge: "PATCH",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui stok";
      addToast({
        type: "error",
        title: "Gagal Update Stok",
        detail: message,
        methodBadge: "PATCH",
      });
    }
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 6: handleDeleteProduct(id) DELETE
  // Tugas: Hapus produk dari database server setelah konfirmasi modal disetujui.
  // Setelah berhasil, tutup modal dengan setDeletingProduct(null) dan perbarui tampilan (muat ulang lewat loadProducts() atau ubah state products).
  // Hint: fetch(`${API_BASE_URL}/${id}`, { method: "DELETE", headers: getApiHeaders() }).
  // Periksa response.ok, tangkap error dengan try/catch, dan tampilkan toast.
  // --------------------------------------------------------------------------
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: getApiHeaders(),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal menghapus produk`);
      }

      setProducts((prev) => prev.filter((item) => item.id !== id));
      setDeletingProduct(null);

      addToast({
        type: "success",
        title: "Produk Berhasil Dihapus",
        detail: "Data produk telah dihapus dari sistem.",
        methodBadge: "DELETE",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menghapus produk";
      addToast({
        type: "error",
        title: "Gagal Menghapus Produk",
        detail: message,
        methodBadge: "DELETE",
      });
    }
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 3: handleCreateProduct(formData) POST
  // Tugas: Tambah produk baru dengan mengirim { name, price, stock }.
  // Ubah input harga dan stok menjadi angka dengan Number(...).
  // Tolak jika nama kosong atau harga <= 0.
  // Setelah berhasil, tutup modal (setIsFormModalOpen(false)) dan perbarui tampilan (muat ulang lewat loadProducts() atau ubah state products).
  // Hint: fetch(API_BASE_URL, { method: "POST", headers: getApiHeaders(), body: JSON.stringify(...) })
  // --------------------------------------------------------------------------
  const handleCreateProduct = async (formData: CreateProductInput) => {
    const name = formData.name ? formData.name.trim() : "";
    const price =  Number(formData.price);
    const stock =  Number(formData.stock);
    
    if (!name || price < 0){
      addToast({
        type: "error",
        title: "Validasi gagal",
        detail: "Nama tifak boleh kosong dan harga tidak boleh negatif",
        methodBadge: "POST",
      });
      return;
    }

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify({ name, price, stock })
      })

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal menambah produk`);
      }

      const json = await res.json();
      setProducts((prev) => [json.data, ...prev]);

        setIsFormModalOpen(false);
        addToast({
          type: "success",
          title: "Produk berhasil ditambahkan",
          detail: "produk sudah berhasil ditambahkan",
          methodBadge: "POST",
        });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "gagal menambah produk";
      addToast({
        type: "error",
        title: message,
        detail: "gagal menambah produk",
        methodBadge: "POST",
      });
    }
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 4: handleUpdateProduct(formData) PUT
  // Tugas: Kirim seluruh data produk berdasarkan id untuk memperbarui data lama.
  // Pastikan form edit terisi data lama.
  // Setelah berhasil, tutup modal (setIsFormModalOpen(false)), reset editingProduct (setEditingProduct(null)), dan perbarui tampilan (muat ulang lewat loadProducts() atau ubah state products).
  // Hint: fetch(`${API_BASE_URL}/${editingProduct.id}`, { method: "PUT", headers: getApiHeaders(), body: JSON.stringify(...) })
  // --------------------------------------------------------------------------
  const handleUpdateProduct = async (formData: CreateProductInput) => {
    if (!editingProduct) return;

    const name = formData.name ? formData.name.trim() : "";
    const price =  Number(formData.price);
    const stock =  Number(formData.stock);

    try {
      const res = await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: getApiHeaders(),
        body: JSON.stringify({ name, price, stock }),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memperbarui produk`);
      }

      const json = await res.json();
      setProducts((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? json.data : item))
      );

      setIsFormModalOpen(false);
      setEditingProduct(null);

      addToast({
        type: "success",
        title: "Produk Berhasil Diperbarui",
        detail: `Perubahan "${name}" berhasil disimpan.`,
        methodBadge: "PUT",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memperbarui produk";
      addToast({
        type: "error",
        title: "Gagal Update Produk",
        detail: message,
        methodBadge: "PUT",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        totalItems={products.length}
        onOpenCreateModal={() => {
          setEditingProduct(null);
          setIsFormModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-4">
        {/* Loading State: Skeleton Shimmer saat data dimuat */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded bg-zinc-200" />
                  <div className="h-4 w-12 rounded-full bg-zinc-200" />
                </div>
                <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200" />
                <div className="mt-2 h-6 w-1/2 rounded bg-zinc-200" />
                <div className="mt-5 border-t border-zinc-100 pt-3">
                  <div className="h-4 w-full rounded bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          /* Error State */
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-xs text-rose-600">
            <p className="font-semibold">{fetchError}</p>
            <button
              onClick={loadProducts}
              className="mt-2 rounded bg-rose-600 px-3 py-1 text-xs text-white hover:bg-rose-700"
            >
              Coba Lagi
            </button>
          </div>
        ) : products.length === 0 ? (
          /* Empty State: Tampilan saat belum ada data produk di database */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
              📦
            </div>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900">
              Katalog Masih Kosong
            </h3>
            <p className="mt-1 max-w-xs text-xs text-zinc-500">
              Belum ada produk yang tersimpan di database server.
            </p>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormModalOpen(true);
              }}
              className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800"
            >
              + Tambah Produk Sekarang
            </button>
          </div>
        ) : (
          /* ------------------------------------------------------------------
           * 🎯 TODO 1.4 [DESAIN]: Grid Responsive
           * Terapkan grid responsif: 1 kolom di HP, 2 kolom di tablet (md:), 3 kolom di laptop (lg:).
           * Hint: Gunakan class Tailwind grid, grid-cols-, serta breakpoint md: (tablet) dan lg: (laptop).
           * ------------------------------------------------------------------ */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setIsFormModalOpen(true);
                }}
                onDelete={(p) => setDeletingProduct(p)}
                onPatchQuickStock={handlePatchQuickStock}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Form (POST / PUT) */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        productToEdit={editingProduct}
      />

      {/* Modal Delete */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}