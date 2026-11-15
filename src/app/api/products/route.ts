// ============================================================================
// 🎯 TODO 5 & TODO 6: API ROUTE HANDLER KOLEKSI (/api/products)
// ============================================================================
// File ini menangani request HTTP ke endpoint `/api/products`:
// - TODO 5: GET /api/products   -> Mengambil list data katalog & filter (READ)
// - TODO 6: POST /api/products  -> Menambahkan item baru ke katalog (CREATE)
//
// ⚠️ CATATAN: File ini sengaja dikosongkan bagian logikanya untuk kamu lengkapi!
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts } from "@/data/mockProducts";
import { CreateProductInput, Product } from "@/types/product";

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 5: IMPLEMENTASIKAN [GET] /api/products
 * ----------------------------------------------------------------------------
 * Tugas Kamu:
 * 1. Ambil query params dari request URL: `search`, `category`, `status`.
 * 2. Ambil data produk awal dari store: `getStoredProducts()`.
 * 3. Terapkan filter:
 *    - Jika ada `search`: saring produk yang title atau description-nya memuat kata kunci.
 *    - Jika ada `category` dan bukan "Semua": saring produk berdasarkan kategori.
 *    - Jika `status === "available"`: saring produk yang `isAvailable === true`.
 * 4. Kembalikan response JSON: { success: true, total: products.length, data: products }.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    let products = getStoredProducts();

    // 👇 TULIS KODE FILTER TODO 5 KAMU DI SINI:
    // ------------------------------------------------------------------------
    // TODO 5.1: Filter berdasarkan kata kunci pencarian (search)
    if (search) {
      // products = products.filter(...)
    }

    // TODO 5.2: Filter berdasarkan kategori jika bukan "Semua"
    if (category && category !== "Semua") {
      // products = products.filter(...)
    }

    // TODO 5.3: Filter status ketersediaan jika status === "available"
    if (status === "available") {
      // products = products.filter(...)
    }
    // ------------------------------------------------------------------------

    return NextResponse.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data produk", error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 6: IMPLEMENTASIKAN [POST] /api/products
 * ----------------------------------------------------------------------------
 * Tugas Kamu:
 * 1. Parse body request JSON: `const body: CreateProductInput = await request.json();`
 * 2. Validasi field wajib: pastikan `body.title`, `body.price`, dan `body.category` ada.
 *    Jika tidak lengkap, kembalikan status 400 Bad Request.
 * 3. Buat objek `newProduct: Product` baru dengan:
 *    - id unik: `prod-${Date.now()}`
 *    - createdAt: `new Date().toISOString()`
 *    - data dari body (pastikan konversi price & stock ke Number)
 * 4. Simpan ke store: `saveStoredProducts([newProduct, ...getStoredProducts()])`
 * 5. Kembalikan response JSON berisi `newProduct` dengan status 201 Created!
 */
export async function POST(request: NextRequest) {
  try {
    // 👇 TULIS KODE IMPLEMENTASI TODO 6 KAMU DI SINI:
    // ------------------------------------------------------------------------
    // Contoh template langkah pengerjaan:
    // const body: CreateProductInput = await request.json();
    // if (!body.title || !body.price || !body.category) { ... return status 400 }
    // const newProduct: Product = { ... }
    // saveStoredProducts([newProduct, ...getStoredProducts()])
    // return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
    // ------------------------------------------------------------------------

    // ❌ Placeholder sebelum kamu lengkapi:
    return NextResponse.json(
      {
        success: false,
        message: "TODO 6 (POST /api/products) belum diimplementasikan! Buka src/app/api/products/route.ts untuk melengkapinya.",
      },
      { status: 501 } // 501 Not Implemented
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Format payload tidak valid", error: String(error) },
      { status: 400 }
    );
  }
}
