# 📚 Modul Mentoring Frontend: Slicing UI + Consume REST API

Template pembelajaran ini dirancang khusus untuk sesi **Mentoring Frontend**:
* **Backend Live Server**: `https://api-mentor.bemfilkomub.cloud/api/v1/products`
* **Swagger Documentation**: `https://api-mentor.bemfilkomub.cloud/docs`
* **Konfigurasi Auth**: Disimpan di `.env` (`NEXT_PUBLIC_API_KEY`)

Materi terbagi menjadi 2 pilar utama Frontend: **Design / Slicing** dan **Integrasi API**.

---

## 🎨 FASE 1: DESAIN & SLICING UI (TODO 1 s/d 3)

Melatih peserta dalam manipulasi visual, responsive layout, formatting data, dan conditional styling dengan Tailwind CSS:

| No. | File Path | Aspek FE yang Dilatih | Deskripsi Tugas |
|:---|:---|:---|:---|
| **TODO 1.1** | [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) | **Data Formatting** | Format angka harga menjadi format Rupiah (`Intl.NumberFormat`) agar tampil `Rp 25.000.000`. |
| **TODO 1.2** | [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) | **Conditional Styling** | Beri warna hijau (`bg-emerald-100 text-emerald-700`) jika stok > 0, atau merah (`bg-rose-100 text-rose-700`) jika stok habis. |
| **TODO 1.3** | [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) | **Interactive Visual State** | Terapkan visual disabled (`disabled:opacity-30 disabled:cursor-not-allowed`) pada tombol kurangi stok jika stok = 0. |
| **TODO 2** | [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) | **Skeleton Loading State** | Tampilkan skeleton shimmer kartu dengan `animate-pulse` saat request data sedang berjalan (`isLoading`). |
| **TODO 3** | [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) | **Empty State UX** | Buat desain kotak bersih dan tombol ajakan saat server belum memiliki produk sama sekali. |

---

## ⚡ FASE 2: KONSUMSI REST API (TODO 4 s/d 8)

Melatih peserta menghubungkan UI yang sudah dibuat dengan server nyata menggunakan `fetch`, state management, dan async/await:

| No. | Nama Fungsi di `src/app/page.tsx` | Method HTTP | Deskripsi Tugas |
|:---|:---|:---|:---|
| **TODO 4** | `loadProducts()` | `GET` | Ambil list produk dari server online dan simpan ke state React. |
| **TODO 5** | `handleCreateProduct(formData)` | `POST` | Kirim data `{ name, price, stock }` ke server untuk membuat produk baru. |
| **TODO 6** | `handleUpdateProduct(formData)` | `PUT` | Timpa data lama dengan data baru saat modal form edit disimpan. |
| **TODO 7** | `handlePatchQuickStock(product, delta)` | `PATCH` | Kirim HANYA field `{ stock: newStock }` saat tombol `[-]` atau `[+]` di kartu ditekan. |
| **TODO 8** | `handleDeleteProduct(id)` | `DELETE` | Hapus produk dari server database. |

---

### 🔑 Referensi & Kunci Jawaban
Jika mentee atau mentor membutuhkan kunci jawaban untuk verifikasi kode, silakan buka file [KUNCI_JAWABAN.md](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/KUNCI_JAWABAN.md).
