# 📖 Panduan Lengkap: Belajar CRUD + PATCH di Next.js App Router

Panduan ini disusun untuk membantumu mempelajari pembuatan aplikasi katalog lengkap dari nol (polosan) hingga siap konsumsi.

---

## 1. Konsep Dasar: Apa Perbedaan PUT dan PATCH?

Dalam perancangan REST API:
* **POST**: Membuat data baru di server (`Create`).
* **GET**: Membaca/mengambil data dari server (`Read`).
* **PUT**: Menggantikan **seluruh** data lama dengan data baru (`Full Update / Replacement`).
  - *Karakteristik*: Klien wajib mengirimkan semua atribut entitas (nama, harga, kategori, deskripsi, gambar, stok, dll). Jika ada field yang tertinggal, field tersebut berpotensi terhapus atau bernilai `null`.
* **PATCH**: Mengubah **sebagian kecil** data saja (`Partial Update`).
  - *Karakteristik*: Klien cukup mengirim atribut yang ingin diubah. Misalnya kita hanya ingin mengubah stok dari `5` menjadi `6`, kita cukup mengirim `{ "stock": 6 }` tanpa perlu mengirim seluruh field produk lainnya!
* **DELETE**: Menghapus data dari server (`Delete`).

---

## 2. Struktur Arsitektur Template Ini

```text
belajar-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.ts          # [GET] List produk & [POST] Tambah produk baru
│   │   │       └── [id]/
│   │   │           └── route.ts      # [GET] Detail, [PUT] Full edit, [PATCH] Partial, [DELETE] Hapus
│   │   ├── globals.css               # Styling Tailwind CSS
│   │   ├── layout.tsx                # Root layout & Metadata
│   │   └── page.tsx                  # Client Component pengonsumsi API (Consume Frontend)
│   ├── components/
│   │   ├── CatalogFilter.tsx         # Input search, tab filter kategori, filter status
│   │   ├── DeleteConfirmModal.tsx    # Modal konfirmasi aksi hapus
│   │   ├── Icons.tsx                 # Koleksi SVG Icons mandiri
│   │   ├── LearningTodoPanel.tsx     # Komponen checklist & panduan interaktif di UI
│   │   ├── Navbar.tsx                # Header dengan statistik counter produk
│   │   ├── ProductCard.tsx           # Kartu katalog dengan tombol demo PUT & PATCH
│   │   ├── ProductFormModal.tsx      # Modal form serbaguna (Create & Edit)
│   │   └── Toast.tsx                 # Notifikasi feedback aksi pengguna
│   ├── data/
│   │   └── mockProducts.ts           # In-Memory database lokal untuk simulasi
│   └── types/
│       └── product.ts                # TypeScript definition & DTOs
├── TODO.md                           # Checklist progress belajar
└── PANDUAN_BELAJAR.md                # Dokumentasi materi & panduan ini
```

---

## 3. Alur Konsumsi API di Frontend (`src/app/page.tsx`)

### A. Membaca Data (GET)
```typescript
const loadProducts = async () => {
  setIsLoading(true);
  try {
    const res = await fetch("/api/products");
    const json = await res.json();
    setProducts(json.data);
  } finally {
    setIsLoading(false);
  }
};
```

### B. Menambahkan Data (POST)
```typescript
const handleCreateProduct = async (formData: CreateProductInput) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  // Tambahkan item baru ke urutan paling atas state
  setProducts((prev) => [json.data, ...prev]);
};
```

### C. Mengubah Seluruh Data (PUT)
```typescript
const handleUpdateProduct = async (formData: CreateProductInput) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData), // Mengirim seluruh form
  });
  const json = await res.json();
  // Timpa item di state dengan data hasil response
  setProducts((prev) => prev.map((p) => p.id === productId ? json.data : p));
};
```

### D. Mengubah Sebagian Data (PATCH)
```typescript
const handlePatchToggleAvailability = async (product: Product) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    // HANYA mengirim field yang ingin diubah!
    body: JSON.stringify({ isAvailable: !product.isAvailable }),
  });
  const json = await res.json();
  setProducts((prev) => prev.map((p) => p.id === product.id ? json.data : p));
};
```

### E. Menghapus Data (DELETE)
```typescript
const handleDeleteProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
};
```

---

## 4. Cara Menjalankan Project

Jalankan perintah berikut di terminal:
```bash
npm run dev
```
Buka browser di alamat `http://localhost:3000`.

Kamu akan langsung melihat:
1. Daftar kartu produk awal yang lengkap dengan gambar, harga format Rupiah, dan rating.
2. Di setiap kartu produk, terdapat tombol **"Set Habis / Tersedia"** dan tombol **"+1 / -1 Stok"** yang langsung memanggil **PATCH**.
3. Tombol **"Edit (PUT)"** untuk mengubah seluruh isi produk via modal form.
4. Tombol **"Hapus (DELETE)"** dengan konfirmasi keamanan.
5. Tombol **"Tambah Item"** di bagian atas untuk mencoba **POST**.
6. Panel **"Roadmap & Checklist Belajar"** di bagian atas yang bisa kamu buka dan centang sesuai kemajuan belajarmu!
