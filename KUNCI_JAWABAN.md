# 🔑 Kunci Jawaban Lengkap (Slicing Design + Consume API)

---

## 🎨 FASE 1: DESAIN & SLICING UI

### 📌 TODO 1.1: Format Rupiah (`src/components/ProductCard.tsx`)
```typescript
const formattedPrice = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}).format(product.price);
```

### 📌 TODO 1.2: Conditional Styling Badge Stok (`src/components/ProductCard.tsx`)
```typescript
const isAvailable = product.stock > 0;

const stockBadgeClass = isAvailable
  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400"
  : "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400";
```

### 📌 TODO 2: Skeleton Loader Card (`src/app/page.tsx`)
```tsx
{isLoading && (
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
)}
```

---

## ⚡ FASE 2: KONSUMSI REST API (`src/app/page.tsx`)

### 📌 TODO 4: [GET] Memuat Data
```typescript
const loadProducts = useCallback(async () => {
  setIsLoading(true);
  try {
    const res = await fetch(API_BASE_URL, {
      headers: getApiHeaders(),
    });
    const json = await res.json();
    setProducts(json.data || []);
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
}, []);
```

### 📌 TODO 5: [POST] Tambah Produk Baru
```typescript
const handleCreateProduct = async (formData: CreateProductInput) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Gagal membuat produk");

  setProducts((prev) => [json.data, ...prev]);
  addToast({ type: "success", title: "Produk Berhasil Dibuat!", methodBadge: "POST" });
};
```

### 📌 TODO 6: [PUT] Edit Seluruh Data Produk
```typescript
const handleUpdateProduct = async (formData: CreateProductInput) => {
  if (!editingProduct) return;

  const res = await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
    method: "PUT",
    headers: getApiHeaders(),
    body: JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Gagal memperbarui");

  setProducts((prev) =>
    prev.map((p) => (p.id === editingProduct.id ? json.data : p))
  );
  addToast({ type: "success", title: "Produk Diperbarui (PUT)", methodBadge: "PUT" });
};
```

### 📌 TODO 7: [PATCH] Ubah Stok Parsial (+ / -)
```typescript
const handlePatchQuickStock = async (product: Product, delta: number) => {
  const newStock = Math.max(0, product.stock + delta);

  const res = await fetch(`${API_BASE_URL}/${product.id}`, {
    method: "PATCH",
    headers: getApiHeaders(),
    body: JSON.stringify({ stock: newStock }),
  });

  const json = await res.json();
  if (!res.ok) return;

  setProducts((prev) =>
    prev.map((p) => (p.id === product.id ? json.data : p))
  );
  addToast({ type: "success", title: "Stok Diperbarui (PATCH)", methodBadge: "PATCH" });
};
```

### 📌 TODO 8: [DELETE] Hapus Produk
```typescript
const handleDeleteProduct = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getApiHeaders(),
  });

  if (!res.ok) return;

  setProducts((prev) => prev.filter((p) => p.id !== id));
  addToast({ type: "success", title: "Produk Berhasil Dihapus", methodBadge: "DELETE" });
};
```
