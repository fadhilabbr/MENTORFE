// ============================================================================
// 🎯 TEMPLATE MENTORING FRONTEND: DESIGN/SLICING + CONSUME API
// ============================================================================
//
// 🎨 BAGIAN 1: UI / SLICING MENTORING
// - TODO 1 [DESIGN di ProductCard.tsx]: Formatting Rupiah & Conditional Badge
// - TODO 2 [DESIGN di page.tsx]: Slicing Skeleton Loading State (animate-pulse)
// - TODO 3 [DESIGN di page.tsx]: Slicing Empty State saat data kosong
//
// ⚡ BAGIAN 2: API CONSUMPTION (CRUD + PATCH)
// - TODO 4 [CONSUME - GET]: Ambil list data dari server
// - TODO 5 [CONSUME - POST]: Buat produk baru dari modal form
// - TODO 6 [CONSUME - PUT]: Perbarui seluruh data produk
// - TODO 7 [CONSUME - PATCH]: Ubah stok secara parsial langsung dari kartu
// - TODO 8 [CONSUME - DELETE]: Hapus produk dari database
// ============================================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CreateProductInput, Product } from "@/types/product";
import { API_BASE_URL, getApiHeaders } from "@/config/api";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormModal } from "@/components/ProductFormModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Toast, ToastMessage } from "@/components/Toast";

export default function CatalogPage() {
  // 1. Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 2. Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // 3. Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 4: [CONSUME - GET] Ambil Data dari API Server
  // Endpoint: GET https://api-mentor.bemfilkomub.cloud/api/v1/products
  // --------------------------------------------------------------------------
  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch(API_BASE_URL, {
        headers: getApiHeaders(),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memuat data dari server`);
      }

      const json = await res.json();
      setProducts(json.data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memuat produk";
      setFetchError(message);
      addToast({
        type: "error",
        title: "Gagal Mengambil Data",
        detail: message,
        methodBadge: "GET",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const res = await fetch(API_BASE_URL, {
          headers: getApiHeaders(),
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const json = await res.json();
        if (!ignore) {
          setProducts(json.data || []);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setFetchError(err instanceof Error ? err.message : "Gagal memuat produk");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      ignore = true;
    };
  }, []);

  // --------------------------------------------------------------------------
  // 🎯 TODO 5: [CONSUME - POST] Tambahkan Produk Baru
  // Endpoint: POST https://api-mentor.bemfilkomub.cloud/api/v1/products
  // --------------------------------------------------------------------------
  const handleCreateProduct = async (formData: CreateProductInput) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 5 (POST) KAMU DI SINI:
    // (Fetch POST ke API_BASE_URL dengan headers getApiHeaders() dan body JSON.stringify(formData))

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 5 (POST) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleCreateProduct untuk item "${formData.name}" di src/app/page.tsx`,
      methodBadge: "POST",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 6: [CONSUME - PUT] Perbarui Seluruh Data Produk
  // Endpoint: PUT https://api-mentor.bemfilkomub.cloud/api/v1/products/{id}
  // --------------------------------------------------------------------------
  const handleUpdateProduct = async (formData: CreateProductInput) => {
    if (!editingProduct) return;

    // 👇 TULIS KODE IMPLEMENTASI TODO 6 (PUT) KAMU DI SINI:
    // (Fetch PUT ke `${API_BASE_URL}/${editingProduct.id}`)

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 6 (PUT) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleUpdateProduct untuk ID "${editingProduct.id}" (${formData.name}) di src/app/page.tsx`,
      methodBadge: "PUT",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 7: [CONSUME - PATCH] Ubah Stok Produk Cepat (+ / -)
  // Endpoint: PATCH https://api-mentor.bemfilkomub.cloud/api/v1/products/{id}
  // --------------------------------------------------------------------------
  const handlePatchQuickStock = async (product: Product, delta: number) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 7 (PATCH) KAMU DI SINI:
    // (Kirim HANYA body: JSON.stringify({ stock: newStock }) ke `${API_BASE_URL}/${product.id}`)

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 7 (PATCH) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handlePatchQuickStock (${delta > 0 ? "+" : ""}${delta}) untuk "${product.name}" di src/app/page.tsx`,
      methodBadge: "PATCH",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 8: [CONSUME - DELETE] Hapus Produk dari Server
  // Endpoint: DELETE https://api-mentor.bemfilkomub.cloud/api/v1/products/{id}
  // --------------------------------------------------------------------------
  const handleDeleteProduct = async (id: string) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 8 (DELETE) KAMU DI SINI:
    // (Fetch DELETE ke `${API_BASE_URL}/${id}`)

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 8 (DELETE) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleDeleteProduct untuk ID "${id}" di src/app/page.tsx`,
      methodBadge: "DELETE",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
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
        {/* ------------------------------------------------------------------
         * 🎯 TODO 2 [DESIGN]: Loading State (Skeleton Loader)
         * ------------------------------------------------------------------
         * Daripada hanya teks biasa, tampilkan skeleton card dengan efek shimmer
         * Tailwind `animate-pulse` agar user experience (UX) tampak profesional!
         * ------------------------------------------------------------------ */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-6 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-850" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          /* Error State */
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center text-xs text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400">
            <p className="font-semibold">{fetchError}</p>
            <button
              onClick={loadProducts}
              className="mt-2 rounded bg-rose-600 px-3 py-1 text-xs text-white hover:bg-rose-700"
            >
              Coba Lagi
            </button>
          </div>
        ) : products.length === 0 ? (
          /* ------------------------------------------------------------------
           * 🎯 TODO 3 [DESIGN]: Empty State (Kondisi Belum Ada Data)
           * Tampilkan kotak bersih yang mengajak pengguna menambahkan produk pertama
           * ------------------------------------------------------------------ */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
              📦
            </div>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Katalog Masih Kosong
            </h3>
            <p className="mt-1 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
              Belum ada produk yang tersimpan di database server.
            </p>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormModalOpen(true);
              }}
              className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              + Tambah Produk Sekarang
            </button>
          </div>
        ) : (
          /* Grid Produk Responsif */
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
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
