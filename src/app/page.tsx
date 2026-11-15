// ============================================================================
// 🎯 TODO 10: CONSUMING API DARI CLIENT COMPONENT (/src/app/page.tsx)
// ============================================================================
// File ini adalah komponen utama frontend yang menghubungkan UI pengguna
// ke backend Route Handlers kita.
//
// ⚠️ CATATAN: Fungsi handler mutasi (POST, PUT, PATCH, DELETE) sengaja
// distub/dikosongkan agar kamu melengkapinya sendiri langkah demi langkah!
// ============================================================================

"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CreateProductInput, Product } from "@/types/product";
import { Navbar } from "@/components/Navbar";
import { CatalogFilter } from "@/components/CatalogFilter";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormModal } from "@/components/ProductFormModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Toast, ToastMessage } from "@/components/Toast";
import { LearningTodoPanel } from "@/components/LearningTodoPanel";
import { PlusIcon } from "@/components/Icons";

export default function CatalogPage() {
  // 1. Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 2. Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "unavailable">("all");

  // 3. Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // 4. Toast Notification State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 10-A: [READ] CONSUME GET /api/products
  // (Fungsi ini sudah disiapkan agar data awal bisa tampil di layar)
  // --------------------------------------------------------------------------
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memuat produk";
      setFetchError(message);
      addToast({
        type: "error",
        title: "Gagal Memuat Katalog",
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
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);
        const json = await res.json();
        if (!ignore) {
          setProducts(json.data || []);
        }
      } catch (err: unknown) {
        if (!ignore) {
          const message = err instanceof Error ? err.message : "Gagal memuat produk";
          setFetchError(message);
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
  // 🎯 TODO 10-B: [CREATE] CONSUME POST /api/products
  // --------------------------------------------------------------------------
  const handleCreateProduct = async (formData: CreateProductInput) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 10-B KAMU DI SINI:
    // (Gunakan fetch dengan method "POST" dan body JSON.stringify(formData))

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 10-B Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleCreateProduct untuk item "${formData.title}" di src/app/page.tsx`,
      methodBadge: "POST",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 10-C: [UPDATE - FULL] CONSUME PUT /api/products/[id]
  // --------------------------------------------------------------------------
  const handleUpdateProduct = async (formData: CreateProductInput) => {
    if (!editingProduct) return;

    // 👇 TULIS KODE IMPLEMENTASI TODO 10-C (PUT) KAMU DI SINI:
    // (Gunakan fetch dengan method "PUT" ke /api/products/${editingProduct.id})

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 10-C Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleUpdateProduct untuk ID "${editingProduct.id}" (${formData.title}) di src/app/page.tsx`,
      methodBadge: "PUT",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 10-D.1: [UPDATE - PARTIAL] CONSUME PATCH /api/products/[id] (Toggle)
  // --------------------------------------------------------------------------
  const handlePatchToggleAvailability = async (product: Product) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 10-D.1 (PATCH TOGGLE) KAMU DI SINI:
    // (Gunakan fetch dengan method "PATCH" dan body { isAvailable: !product.isAvailable })

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 10-D (PATCH) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handlePatchToggleAvailability untuk "${product.title}" di src/app/page.tsx`,
      methodBadge: "PATCH",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 10-D.2: [UPDATE - PARTIAL] CONSUME PATCH /api/products/[id] (Stok)
  // --------------------------------------------------------------------------
  const handlePatchQuickStock = async (product: Product, delta: number) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 10-D.2 (PATCH STOCK) KAMU DI SINI:
    // (Gunakan fetch dengan method "PATCH" dan body { stock: product.stock + delta })

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 10-D (Stock PATCH) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handlePatchQuickStock (${delta > 0 ? "+" : ""}${delta}) untuk "${product.title}" di src/app/page.tsx`,
      methodBadge: "PATCH",
    });
  };

  // --------------------------------------------------------------------------
  // 🎯 TODO 10-E: [DELETE] CONSUME DELETE /api/products/[id]
  // --------------------------------------------------------------------------
  const handleDeleteProduct = async (id: string) => {
    // 👇 TULIS KODE IMPLEMENTASI TODO 10-E (DELETE) KAMU DI SINI:
    // (Gunakan fetch dengan method "DELETE" ke /api/products/${id})

    // ❌ Placeholder sebelum kamu lengkapi:
    addToast({
      type: "info",
      title: "TODO 10-E (DELETE) Belum Dilengkapi!",
      detail: `Lengkapi fungsi handleDeleteProduct untuk ID "${id}" di src/app/page.tsx`,
      methodBadge: "DELETE",
    });
  };

  // ==========================================
  // Filter & Search Logic
  // ==========================================
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        selectedCategory === "Semua" || p.category === selectedCategory;

      const matchAvail =
        availabilityFilter === "all"
          ? true
          : availabilityFilter === "available"
          ? p.isAvailable
          : !p.isAvailable;

      return matchSearch && matchCat && matchAvail;
    });
  }, [products, searchQuery, selectedCategory, availabilityFilter]);

  const availableCount = useMemo(
    () => products.filter((p) => p.isAvailable).length,
    [products]
  );

  return (
    <div className="min-h-screen bg-zinc-50/70 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      {/* Top Navbar */}
      <Navbar
        totalItems={products.length}
        availableItems={availableCount}
        onOpenCreateModal={() => {
          setEditingProduct(null);
          setIsFormModalOpen(true);
        }}
      />

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
        {/* Learning Todo & Concept Roadmap */}
        <LearningTodoPanel />

        {/* Catalog Filter Controls */}
        <CatalogFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
        />

        {/* Content State: Loading, Error, Empty, or Product Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <p className="mt-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              Memuat data katalog via GET /api/products...
            </p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/60 py-16 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
              {fetchError}
            </p>
            <button
              onClick={loadProducts}
              className="mt-3 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
            >
              Coba Muat Ulang
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white py-20 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
              <PlusIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-800 dark:text-zinc-200">
              Tidak ada produk yang cocok
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
              Coba sesuaikan kata kunci pencarian, ubah filter kategori, atau tambahkan produk baru.
            </p>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormModalOpen(true);
              }}
              className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700"
            >
              Tambah Produk Baru Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setIsFormModalOpen(true);
                }}
                onDelete={(p) => setDeletingProduct(p)}
                onPatchToggleAvailability={handlePatchToggleAvailability}
                onPatchQuickStock={handlePatchQuickStock}
              />
            ))}
          </div>
        )}
      </main>

      {/* Reusable Form Modal (POST for Create, PUT for Edit) */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
      />

      {/* Floating Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
