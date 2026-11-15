# 📋 Panduan Pengerjaan: TODO 1 s/d TODO 10 Langsung di Kode

Semua penanda tugas (`TODO`) telah disematkan langsung di dalam file kode sumber dengan penjelasan tujuan, instruksi, dan petunjuk langkah demi langkah.

---

### 🗺️ Peta Lokasi TODO di Dalam Kode:

| No. | File Path | Fokus Materi | Deskripsi Tugas |
|:---|:---|:---|:---|
| **TODO 1** | [`src/types/product.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/types/product.ts) | **TypeScript Data Model** | Definisikan `Product` interface dan DTOs (`CreateProductInput`, `UpdateProductInput`, `PatchProductInput`). |
| **TODO 2** | [`src/data/mockProducts.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/data/mockProducts.ts) | **Data Layer** | Siapkan initial dataset dan fungsi helper getter/setter store in-memory. |
| **TODO 3** | [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) | **UI Component (Card)** | Format harga ke Rupiah, tampilkan badge ketersediaan, serta tombol aksi PUT & Quick PATCH. |
| **TODO 4** | [`src/components/ProductFormModal.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductFormModal.tsx) | **Form Component (Modal)** | Validasi field wajib, susun payload DTO, dan hubungkan callback submit. |
| **TODO 5** | [`src/app/api/products/route.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/api/products/route.ts) | **API Route (GET)** | Baca data, filter berdasarkan query (`search`, `category`, `status`), return JSON 200. |
| **TODO 6** | [`src/app/api/products/route.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/api/products/route.ts) | **API Route (POST)** | Validasi body, buat ID unik & timestamp, simpan ke store, return status 201 Created. |
| **TODO 7** | [`src/app/api/products/[id]/route.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/api/products/[id]/route.ts) | **API Route (PUT)** | Full replacement: cek keberadaan ID, validasi field utama, timpa seluruh data lama. |
| **TODO 8** | [`src/app/api/products/[id]/route.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/api/products/[id]/route.ts) | **API Route (PATCH)** | Partial update: cari ID, lakukan merge hanya pada atribut yang dikirimkan. |
| **TODO 9** | [`src/app/api/products/[id]/route.ts`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/api/products/[id]/route.ts) | **API Route (DELETE)** | Hapus produk berdasarkan ID dari array data, return status 200 OK. |
| **TODO 10** | [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) | **Frontend API Consumption** | Konsumsi API via `fetch`: <br>• **10-A**: GET list produk<br>• **10-B**: POST produk baru<br>• **10-C**: PUT perbarui produk<br>• **10-D**: PATCH toggle status & stok<br>• **10-E**: DELETE hapus produk |

---

### 💡 Cara Belajar dengan Template Ini:
1. Buka file secara berurutan mulai dari `TODO 1` sampai `TODO 10`.
2. Baca blok komentar `🎯 TODO [Nomor]` di bagian atas setiap file.
3. Pelajari implementasi yang disediakan, atau coba modifikasi/tulis ulang fungsi-fungsinya untuk menguji pemahamanmu.
4. Jalankan `npm run dev` dan buka `http://localhost:3000` untuk melihat perubahan secara langsung.
