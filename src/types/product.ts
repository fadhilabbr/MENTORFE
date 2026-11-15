// ============================================================================
// 🎯 TODO 1: DEFINISIKAN DATA MODEL & TYPESCRIPT INTERFACES
// ============================================================================
// Tujuan:
// Menjamin keamanan tipe data (type-safety) di seluruh aplikasi baik di sisi
// Server (API Route) maupun di sisi Klien (React Components).
//
// Petunjuk Pengerjaan:
// 1. Lengkapi interface `Product` dengan field-field yang diperlukan katalog.
// 2. Buat DTO (Data Transfer Object):
//    - `CreateProductInput`: data yang dikirim saat POST (tanpa id & createdAt)
//    - `UpdateProductInput`: data yang dikirim saat PUT (menggantikan seluruh atribut)
//    - `PatchProductInput`: data yang dikirim saat PATCH (semua field bersifat opsional/partial)
// ============================================================================

export interface Product {
  id: string;             // ID unik produk, misal: "prod-1" atau UUID
  title: string;          // Nama produk
  description: string;    // Penjelasan detail produk
  price: number;          // Harga produk (angka murni)
  category: string;       // Kategori produk
  imageUrl: string;       // URL gambar produk
  rating: number;         // Rating bintang (1.0 - 5.0)
  stock: number;          // Jumlah stok tersisa
  isAvailable: boolean;   // Status aktif/ketersediaan (Sangat cocok untuk latihan PATCH!)
  createdAt: string;      // Timestamp ISO string kapan produk dibuat
}

// TODO 1.1: Buat tipe untuk payload pembuatan produk baru (POST)
// Hint: Gunakan TypeScript utility type `Omit<Product, 'id' | 'createdAt'>`
export type CreateProductInput = Omit<Product, "id" | "createdAt">;

// TODO 1.2: Buat tipe untuk payload pembaruan seluruh produk (PUT)
// Pada metode PUT, semua field utama dikirim ulang untuk menggantikan data lama
export type UpdateProductInput = Omit<Product, "id" | "createdAt">;

// TODO 1.3: Buat tipe untuk payload pembaruan sebagian produk (PATCH)
// Hint: Gunakan TypeScript utility type `Partial<...>` karena saat PATCH, kita bisa kirim 1 field saja
export type PatchProductInput = Partial<Omit<Product, "id" | "createdAt">>;

export type Category = "Elektronik" | "Aksesoris" | "Fashion" | "Peralatan" | "Lainnya";

export const CATEGORIES: Category[] = [
  "Elektronik",
  "Aksesoris",
  "Fashion",
  "Peralatan",
  "Lainnya",
];
