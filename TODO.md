# 📋 Panduan Pengerjaan Hands-On: Merchant Inventory Dashboard (Filkom Store)

Selamat datang di hands-on **Merchant Inventory Dashboard (Filkom Store)**! Dashboard ini dibuat menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**.

Tugasmu adalah melengkapi fitur desain (slicing) dan integrasi REST API dengan backend server.

---

## 🚀 Urutan Pengerjaan Peserta

Kerjakan secara bertahap dengan urutan berikut:
1. **Fase 1 (Desain UI)**: TODO 1.1 ➔ 1.2 ➔ 1.3 ➔ 1.4 ➔ 1.5
2. **Fase 2 (Consume API)**: TODO 2 ➔ TODO 5 ➔ TODO 6 ➔ TODO 3 ➔ TODO 4

> 💡 **Catatan Tampilan Awal**: Sebelum TODO 2 diselesaikan, katalog secara default akan menampilkan tampilan kosong (**Empty State**). Hal ini wajar dan normal karena pengambilan data produk dari server belum diimplementasikan.

---

## 🎨 FASE 1: DESAIN & SLICING UI

Fokus pada manipulasi visual, pemformatan data angka, conditional styling, dan interaktivitas komponen kartu dan grid.

### 📌 TODO 1.1: Format Harga Rupiah
* **File & Lokasi**: [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) (variabel `formattedPrice`)
* **Tujuan**: Mengubah angka mentah dari server menjadi format mata uang Rupiah Indonesia standar.
* **Petunjuk**: Gunakan objek JavaScript `Intl.NumberFormat` dengan locale `id-ID`, opsi `style: 'currency'`, `currency: 'IDR'`, serta hilangkan angka pecahan desimal (`maximumFractionDigits: 0`).
* **Selesai Kalau**: Angka harga `25000000` tampil sebagai `"Rp 25.000.000"`, dan angka `0` tampil sebagai `"Rp 0"`.

### 📌 TODO 1.2: Badge Status Stok
* **File & Lokasi**: [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) (variabel `stockBadgeClass` & `stockBadgeText`)
* **Tujuan**: Memberi indikator visual ketersediaan barang berupa teks dan warna badge.
* **Petunjuk**: Gunakan evaluasi kondisi `product.stock > 0` untuk menentukan variasi class Tailwind (warna hijau saat tersedia vs warna merah saat habis) serta teks label (`"Tersedia"` jika stok > 0, `"Habis"` jika stok 0).
* **Selesai Kalau**: Saat stok > 0, badge berwarna hijau dan memuat teks `"Tersedia"`. Saat stok 0, badge berwarna merah dan memuat teks `"Habis"`.

### 📌 TODO 1.3: Tombol [-] Nonaktif Saat Stok 0
* **File & Lokasi**: [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) (tag `<button>` tombol `-`)
* **Tujuan**: Mencegah pengguna mengurangi stok jika stok sudah 0 dan memberikan indikator visual bahwa tombol dinonaktifkan.
* **Petunjuk**: Atur kondisi pada atribut `disabled` (saat stok habis atau sedang updating), lalu manfaatkan varian Tailwind `disabled:` untuk mengatur transparansi dan perubahan kursor.
* **Selesai Kalau**: Pada produk yang stoknya 0, tombol `[-]` tidak dapat diklik, tampilan tombol meredup (opacity 30%), dan kursor berubah menjadi simbol dilarang (`not-allowed`).

### 📌 TODO 1.4: Grid Responsif
* **File & Lokasi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) (elemen container daftar produk)
* **Tujuan**: Mengatur susunan kolom kartu produk agar menyesuaikan ukuran layar perangkat pengguna secara proporsional.
* **Petunjuk**: Gunakan class responsive Tailwind: awali dengan `grid` dan `grid-cols-`, lalu manfaatkan breakpoint `md:` untuk tablet dan `lg:` untuk laptop/desktop.
* **Selesai Kalau**: Tampilan grid otomatis menyesuaikan: 1 kolom di layar HP, 2 kolom di layar tablet (`md:`), dan 3 kolom di layar laptop/desktop (`lg:`).

### 📌 TODO 1.5: Efek Hover Kartu
* **File & Lokasi**: [`src/components/ProductCard.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/components/ProductCard.tsx) (elemen pembungkus kartu terluar)
* **Tujuan**: Memberikan umpan balik interaktif yang halus saat kursor mouse melayang di atas kartu produk.
* **Petunjuk**: Tambahkan class utilitas Tailwind untuk animasi transisi halus dan peningkatan elevasi bayangan saat kursor diarahkan ke kartu (`hover:shadow-`).
* **Selesai Kalau**: Saat kursor diarahkan ke kartu produk, bayangan kartu membesar secara halus (`shadow-lg`).

---

## ⚡ FASE 2: KONSUMSI REST API & CRUD

Hubungkan antarmuka dengan REST API server live. Seluruh konfigurasi endpoint dan API key telah disediakan di `.env.local` (`NEXT_PUBLIC_API_BASE_URL` dan `NEXT_PUBLIC_API_KEY`). Gunakan fungsi pembantu `getApiHeaders()` dari `src/config/api.ts`.

> **Aturan Umum Fase 2**:
> - Selalu gunakan blok `try/catch` dan tampilkan toast (`addToast`) jika terjadi kegagalan.
> - Periksa `response.ok` sebelum menganggap request berhasil.
> - Setelah request berhasil, perbarui tampilan antarmuka: kamu dapat memilih antara memuat ulang data dengan `loadProducts()` atau langsung memperbarui state `products`.

### 📌 TODO 2: `loadProducts()` (GET)
* **File & Fungsi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) -> `loadProducts()`
* **Tujuan**: Mengambil seluruh daftar produk dari server saat halaman pertama kali dimuat.
* **Petunjuk**: Panggil `fetch(API_BASE_URL, { headers: getApiHeaders() })`, periksa `res.ok`, lalu parse json dan simpan `json.data` ke state `products`. Atur `isLoading` agar skeleton tampil saat menunggu data.
* **Selesai Kalau**: Saat halaman dimuat/refresh, skeleton loading muncul sebentar, kemudian kartu-kartu produk muncul di layar sesuai data server (atau muncul empty state jika database memang kosong).

### 📌 TODO 5: `handlePatchQuickStock(product, delta)` (PATCH)
* **File & Fungsi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) -> `handlePatchQuickStock()`
* **Tujuan**: Mengubah stok barang secara parsial dan cepat (+1 atau -1) langsung dari tombol kartu.
* **Petunjuk**: Hitung `newStock = product.stock + delta`. Validasi agar tidak mengirim request jika `newStock < 0`. Kirim request dengan method `"PATCH"` ke `${API_BASE_URL}/${product.id}` membawa body `{ stock: newStock }`. Setelah berhasil, perbarui tampilan antarmuka (muat ulang lewat `loadProducts()` atau ubah state `products`).
* **Selesai Kalau**: Mengklik `[+]` menambah stok di server dan di layar; mengklik `[-]` mengurangi stok hingga batas minimal 0. Muncul notifikasi toast sukses.

### 📌 TODO 6: `handleDeleteProduct(id)` (DELETE)
* **File & Fungsi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) -> `handleDeleteProduct()`
* **Tujuan**: Menghapus data produk dari database server secara permanen.
* **Petunjuk**: Kirim fetch method `"DELETE"` ke `${API_BASE_URL}/${id}` dengan headers `getApiHeaders()`. Setelah berhasil, tutup modal dengan memanggil `setDeletingProduct(null)`, perbarui tampilan antarmuka (muat ulang lewat `loadProducts()` atau ubah state `products`), dan tampilkan toast sukses.
* **Selesai Kalau**: Mengklik "Hapus" pada kartu membuka modal konfirmasi; setelah mengonfirmasi hapus, modal menutup, kartu terhapus dari layar, dan muncul toast sukses.

### 📌 TODO 3: `handleCreateProduct(formData)` (POST)
* **File & Fungsi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) -> `handleCreateProduct()`
* **Tujuan**: Menambahkan produk baru ke database melalui form modal.
* **Petunjuk**: Pastikan konversi tipe angka dilakukan dengan `Number(...)`. Lakukan validasi: tolak jika nama kosong atau harga <= 0. Kirim fetch method `"POST"` ke `API_BASE_URL` membawa `{ name, price, stock }`. Setelah berhasil, tutup modal (`setIsFormModalOpen(false)`), perbarui tampilan antarmuka (muat ulang lewat `loadProducts()` atau ubah state `products`), dan tampilkan toast sukses.
* **Selesai Kalau**: Mengklik tombol "+ Tambah Produk", mengisi form dengan benar, lalu klik "Simpan": modal menutup otomatis, produk baru muncul di layar, dan toast sukses tampil.

### 📌 TODO 4: `handleUpdateProduct(formData)` (PUT)
* **File & Fungsi**: [`src/app/page.tsx`](file:///d:/projects_vsssl/FEEEEEEEEEEE/belajar-next/src/app/page.tsx) -> `handleUpdateProduct()`
* **Tujuan**: Memperbarui seluruh field data produk lama berdasarkan ID produk yang sedang diedit.
* **Petunjuk**: Pastikan `editingProduct` tersedia. Kirim fetch method `"PUT"` ke `${API_BASE_URL}/${editingProduct.id}` dengan body data terbaru. Setelah berhasil, tutup modal (`setIsFormModalOpen(false)`), reset state `editingProduct` menjadi `null`, perbarui tampilan antarmuka (muat ulang lewat `loadProducts()` atau ubah state `products`), dan tampilkan toast sukses.
* **Selesai Kalau**: Mengklik "Edit" membuka modal yang sudah terisi nama, harga, dan stok lama; setelah diedit dan disimpan, modal menutup, kartu produk terupdate dengan data baru, dan toast sukses tampil.
