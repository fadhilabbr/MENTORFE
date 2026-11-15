// ============================================================================
// 🎯 TODO 2: MENYIAPKAN MOCK DATABASE & DATA STORE IN-MEMORY
// ============================================================================
// Tujuan:
// Sebagai template belajar, kita menggunakan in-memory storage sederhana agar
// perubahan data (Create, Update, Patch, Delete) dapat bekerja nyata tanpa
// perlu setup database eksternal (seperti Postgres / MySQL) terlebih dahulu.
//
// Petunjuk Pengerjaan:
// 1. Definisikan array awal produk (dummy data).
// 2. Buat fungsi getter `getStoredProducts()` dan setter `saveStoredProducts()`.
// ============================================================================

import { Product } from "@/types/product";

// TODO 2.1: Buat daftar produk awal untuk katalog
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Wireless Noise-Canceling Headphone",
    description: "Headphone over-ear dengan suara jernih, bass bertenaga, dan fitur active noise cancellation hingga 30 jam pemakaian.",
    price: 1499000,
    category: "Elektronik",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    stock: 15,
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    title: "Mechanical Keyboard RGB 75%",
    description: "Keyboard mekanikal kompak 75% dengan switch hot-swappable, keycaps PBT, dan pencahayaan RGB yang dapat dikustomisasi.",
    price: 850000,
    category: "Elektronik",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    stock: 24,
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    title: "Minimalist Leather Backpack",
    description: "Tas ransel kulit sintetis premium tahan air dengan kompartemen laptop hingga 15.6 inch dan kantong tersembunyi.",
    price: 499000,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    stock: 8,
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    title: "Smart Fitness Watch Gen-2",
    description: "Jam tangan pintar dengan monitor detak jantung, SpO2, pelacak tidur, 50+ mode olahraga, dan ketahanan air 5 ATM.",
    price: 1199000,
    category: "Aksesoris",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    stock: 0,
    isAvailable: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-5",
    title: "Ergonomic Aluminium Laptop Stand",
    description: "Penyangga laptop lipat berbahan aluminium kokoh untuk memperbaiki postur kerja, mendukung laptop ukuran 11-17 inch.",
    price: 245000,
    category: "Peralatan",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    stock: 35,
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-6",
    title: "Stainless Steel Insulated Tumbler 750ml",
    description: "Tumbler vakum dinding ganda yang menjaga minuman tetap dingin hingga 24 jam atau panas hingga 12 jam.",
    price: 185000,
    category: "Peralatan",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    stock: 50,
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
];

// Helper global in-memory store untuk Next.js Server
declare global {
  var __mockProducts: Product[] | undefined;
}

// TODO 2.2: Buat getter untuk mengambil list produk yang ada di memory
export function getStoredProducts(): Product[] {
  if (!globalThis.__mockProducts) {
    globalThis.__mockProducts = [...INITIAL_PRODUCTS];
  }
  return globalThis.__mockProducts;
}

// TODO 2.3: Buat setter untuk memperbarui list produk di memory
export function saveStoredProducts(products: Product[]): void {
  globalThis.__mockProducts = products;
}
