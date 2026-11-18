# 🔑 KUNCI JAWABAN (KHUSUS MENTOR)
## Hands-On: Merchant Inventory Dashboard (Filkom Store)

> **Catatan Kerahasiaan**: File ini ditujukan khusus bagi mentor sebagai acuan verifikasi dan panduan evaluasi. File ini telah didaftarkan pada `.gitignore` sehingga tidak ikut terunggah atau terdistribusi ke repositori peserta.

---

### 💡 Keputusan Strategi State Update Setelah Mutasi (Fase 2)
Pada kunci jawaban ini, kami memilih **mengubah state lokal secara langsung (direct/optimistic state update)** daripada memanggil ulang `loadProducts()`. 

**Alasan**:
> Mengubah state lokal secara langsung memberikan pengalaman antarmuka yang instan tanpa jeda loading tambahan ke pengguna, sekaligus menghemat penggunaan kuota request server. Opsi memuat ulang data dengan `loadProducts()` tetap sah jika mentor menghendaki jaminan data tersinkronisasi 100% dengan database termasuk metadata server (`updated_at`).

---

## 🎨 FASE 1: DESAIN & SLICING UI

### 📌 TODO 1.1: Format Harga Rupiah
**File**: `src/components/ProductCard.tsx`
```typescript
const formattedPrice = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
}).format(product.price);
```
**Penjelasan**:
`Intl.NumberFormat` adalah API bawaan JavaScript untuk memformat angka ke standar mata uang lokal secara konsisten. Opsi `maximumFractionDigits: 0` digunakan untuk menghilangkan nominal sen desimal agar harga Rupiah tampil bulat dan rapi.

---

### 📌 TODO 1.2: Badge Status Stok
**File**: `src/components/ProductCard.tsx`
```typescript
const isAvailable = product.stock > 0;
const stockBadgeClass = isAvailable
  ? "bg-emerald-100 text-emerald-700"
  : "bg-rose-100 text-rose-700";
const stockBadgeText = isAvailable ? "Tersedia" : "Habis";
```
Pada elemen JSX:
```tsx
<span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stockBadgeClass}`}>
  {stockBadgeText}
</span>
```
**Penjelasan**:
Variabel boolean `isAvailable` mempermudah evaluasi kondisi stok secara deklaratif untuk menentukan tema warna badge Tailwind sekaligus teks informasinya. Hal ini memastikan pengguna memahami ketersediaan produk baik melalui indikator warna maupun label teks yang jelas.

---

### 📌 TODO 1.3: Tombol [-] Nonaktif Saat Stok 0
**File**: `src/components/ProductCard.tsx`
```tsx
<button
  type="button"
  disabled={product.stock <= 0 || isUpdating}
  onClick={() => handleStock(-1)}
  title="Kurangi stok 1 (PATCH)"
  className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
>
  -
</button>
```
**Penjelasan**:
Atribut `disabled` mencegah pemanggilan handler fungsi saat stok bernilai 0 atau saat proses asynchronous sedang berjalan. Class utilitas Tailwind `disabled:opacity-30` dan `disabled:cursor-not-allowed` memberikan isyarat visual langsung bahwa tombol tidak dapat diinteraksikan.

---

### 📌 TODO 1.4: Grid Responsif
**File**: `src/app/page.tsx`
```tsx
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
```
**Penjelasan**:
Breakpoint Tailwind `md:` (tablet) dan `lg:` (laptop/desktop) digunakan untuk mengubah jumlah kolom grid secara fleksibel dari 1 kolom di HP menjadi 2 dan 3 kolom di layar yang lebih lebar. Pendekatan *mobile-first* ini memastikan tata letak katalog tetap proporsional dan tidak berantakan di semua resolusi gawai.

---

### 📌 TODO 1.5: Efek Hover Kartu
**File**: `src/components/ProductCard.tsx`
```tsx
<div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition hover:shadow-lg">
```
**Penjelasan**:
Class `hover:shadow-lg` menaikkan elevasi bayangan kartu saat disentuh kursor mouse untuk menciptakan kesan interaktif dan hidup. Properti `transition` menghaluskan animasi transisi bayangan tersebut sehingga kartu terasa premium dan tidak kaku.

---

## ⚡ FASE 2: KONSUMSI REST API & CRUD

### 📌 TODO 2: `loadProducts()` (GET)
**File**: `src/app/page.tsx`
```typescript
const addToast = useCallback((toast: Omit<ToastMessage, "id">) => {
  const id = `toast-${Date.now()}-${Math.random()}`;
  const newToast: ToastMessage = { ...toast, id };
  setToasts((prev) => [...prev, newToast]);

  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 4000);
}, []);

const loadProducts = useCallback(async () => {
  setIsLoading(true);
  setFetchError(null);
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
}, [addToast]);

useEffect(() => {
  const timer = setTimeout(() => {
    void loadProducts();
  }, 0);

  return () => clearTimeout(timer);
}, [loadProducts]);
```
**Penjelasan**:
Fungsi ini melakukan HTTP GET ke API endpoint dengan menyertakan header otentikasi API key untuk mengambil koleksi produk. Blok `finally` memastikan state `isLoading` selalu dinonaktifkan sehingga indikator skeleton berhenti baik ketika request berhasil maupun gagal.

---

### 📌 TODO 5: `handlePatchQuickStock(product, delta)` (PATCH)
**File**: `src/app/page.tsx`
```typescript
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
```
**Penjelasan**:
Request HTTP PATCH mengirimkan payload parsial berupa `{ stock: newStock }` ke endpoint individual produk tanpa perlu mengirim ulang data yang tidak berubah. State diperbarui langsung menggunakan data kembalian server (`json.data`) untuk menjamin konsistensi nilai stok di UI.

---

### 📌 TODO 6: `handleDeleteProduct(id)` (DELETE)
**File**: `src/app/page.tsx`
```typescript
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
```
**Penjelasan**:
Method DELETE dijalankan setelah pengguna menyetujui konfirmasi pada modal untuk mencegah kehilangan data secara tidak sengaja. Setelah server membalas dengan status sukses, array produk difilter untuk membuang item dan modal ditutup dengan `setDeletingProduct(null)`.

---

### 📌 TODO 3: `handleCreateProduct(formData)` (POST)
**File**: `src/app/page.tsx`
```typescript
const handleCreateProduct = async (formData: CreateProductInput) => {
  const name = formData.name ? formData.name.trim() : "";
  const price = Number(formData.price);
  const stock = Number(formData.stock);

  if (!name || price <= 0) {
    addToast({
      type: "error",
      title: "Validasi Gagal",
      detail: "Nama tidak boleh kosong dan harga harus lebih dari 0",
      methodBadge: "POST",
    });
    return;
  }

  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify({ name, price, stock }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: Gagal menambah produk`);
    }

    const json = await res.json();
    setProducts((prev) => [json.data, ...prev]);

    setIsFormModalOpen(false);
    addToast({
      type: "success",
      title: "Produk Berhasil Ditambahkan",
      detail: `Produk "${name}" telah disimpan ke katalog.`,
      methodBadge: "POST",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambah produk";
    addToast({
      type: "error",
      title: "Gagal Menambah Produk",
      detail: message,
      methodBadge: "POST",
    });
  }
};
```
**Penjelasan**:
Validasi nilai input di sisi client memastikan bahwa nama barang tidak berupa string kosong dan harga selalu bernilai positif sebelum request dikirim. Penutupan modal dilakukan setelah `res.ok` terpenuhi dan item baru langsung disisipkan ke urutan teratas daftar state.

---

### 📌 TODO 4: `handleUpdateProduct(formData)` (PUT)
**File**: `src/app/page.tsx`
```typescript
const handleUpdateProduct = async (formData: CreateProductInput) => {
  if (!editingProduct) return;

  const name = formData.name ? formData.name.trim() : "";
  const price = Number(formData.price);
  const stock = Number(formData.stock);

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
```
**Penjelasan**:
Method PUT menggantikan keseluruhan data produk di server dengan payload baru yang dikirimkan melalui modal formulir edit. Setelah operasi berhasil, state `editingProduct` dinolkan kembali (`null`) dan modal ditutup untuk menjaga kebersihan siklus form.
