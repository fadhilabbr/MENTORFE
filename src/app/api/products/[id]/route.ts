// ============================================================================
// 🎯 TODO 7, TODO 8, & TODO 9: API ROUTE HANDLER INDIVIDUAL (/api/products/[id])
// ============================================================================
// File ini menangani request HTTP ke item produk spesifik berdasarkan ID:
// - GET   /api/products/[id] -> Mengambil detail 1 produk (sudah disediakan)
// - TODO 7: PUT   /api/products/[id] -> Full update (menggantikan seluruh data)
// - TODO 8: PATCH /api/products/[id] -> Partial update (mengubah sebagian field)
// - TODO 9: DELETE/api/products/[id] -> Menghapus produk dari katalog
//
// ⚠️ CATATAN: Logika fungsi PUT, PATCH, dan DELETE sengaja dikosongkan untuk kamu lengkapi!
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts } from "@/data/mockProducts";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PatchProductInput, UpdateProductInput } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * [GET] /api/products/[id]
 * Mengambil detail satu produk berdasarkan ID (sudah siap digunakan).
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const products = getStoredProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { success: false, message: `Produk dengan ID '${id}' tidak ditemukan` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 7: IMPLEMENTASIKAN [PUT] /api/products/[id] (FULL UPDATE)
 * ----------------------------------------------------------------------------
 * Karakteristik PUT:
 * Menggantikan SELURUH data produk dengan payload baru yang dikirimkan klien.
 *
 * Tugas Kamu:
 * 1. Ambil `const { id } = await params;`
 * 2. Parse body: `const body: UpdateProductInput = await request.json();`
 * 3. Cari index produk di array `getStoredProducts()` dengan `findIndex`.
 *    Jika tidak ditemukan (index === -1), return status 404.
 * 4. Validasi bahwa semua field utama (title, price, category) ada di body.
 * 5. Buat objek produk baru yang menimpa seluruh atribut lama.
 * 6. Simpan array yang telah diperbarui via `saveStoredProducts()`.
 * 7. Kembalikan response JSON dengan status 200 OK.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 👇 TULIS KODE IMPLEMENTASI TODO 7 (PUT) KAMU DI SINI:
    // ------------------------------------------------------------------------
    // Langkah 1: const body: UpdateProductInput = await request.json();
    // Langkah 2: const products = getStoredProducts();
    // Langkah 3: const index = products.findIndex((p) => p.id === id);
    // Langkah 4: if (index === -1) { return 404 Not Found }
    // Langkah 5: products[index] = { ...products[index], ...body }
    // Langkah 6: saveStoredProducts(products)
    // Langkah 7: return NextResponse.json({ success: true, data: products[index] })
    // ------------------------------------------------------------------------

    // ❌ Placeholder sebelum kamu lengkapi:
    return NextResponse.json(
      {
        success: false,
        message: `TODO 7 (PUT /api/products/${id}) belum diimplementasikan! Buka src/app/api/products/[id]/route.ts untuk melengkapinya.`,
      },
      { status: 501 } // 501 Not Implemented
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada PUT", error: String(error) },
      { status: 400 }
    );
  }
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 8: IMPLEMENTASIKAN [PATCH] /api/products/[id] (PARTIAL UPDATE)
 * ----------------------------------------------------------------------------
 * Karakteristik PATCH:
 * Mengubah HANYA atribut tertentu yang dikirimkan. Atribut yang tidak dikirim
 * HARUS TETAP MEMPERTAHANKAN nilai yang lama!
 *
 * Tugas Kamu:
 * 1. Ambil `const { id } = await params;`
 * 2. Parse body: `const body: PatchProductInput = await request.json();`
 * 3. Cari produk lama di store berdasarkan `id`. Jika tidak ada, return 404.
 * 4. Gabungkan atribut: pertahankan objek lama, timpa HANYA field yang tidak undefined!
 *    Hint:
 *    const patched = {
 *      ...existing,
 *      ...(body.isAvailable !== undefined && { isAvailable: body.isAvailable }),
 *      ...(body.stock !== undefined && { stock: Number(body.stock) }),
 *      ...(body.price !== undefined && { price: Number(body.price) }),
 *      ...(body.title !== undefined && { title: body.title }),
 *    };
 * 5. Simpan via `saveStoredProducts()`.
 * 6. Return response JSON status 200 OK.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 👇 TULIS KODE IMPLEMENTASI TODO 8 (PATCH) KAMU DI SINI:
    // ------------------------------------------------------------------------
    // Langkah 1: const body: PatchProductInput = await request.json();
    // Langkah 2: const products = getStoredProducts();
    // Langkah 3: const index = products.findIndex((p) => p.id === id);
    // Langkah 4: if (index === -1) { return 404 Not Found }
    // Langkah 5: Gabungkan hanya field yang dikirim di body
    // Langkah 6: saveStoredProducts(products)
    // Langkah 7: return NextResponse.json({ success: true, data: products[index] })
    // ------------------------------------------------------------------------

    // ❌ Placeholder sebelum kamu lengkapi:
    return NextResponse.json(
      {
        success: false,
        message: `TODO 8 (PATCH /api/products/${id}) belum diimplementasikan! Buka src/app/api/products/[id]/route.ts untuk melengkapinya.`,
      },
      { status: 501 } // 501 Not Implemented
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada PATCH", error: String(error) },
      { status: 400 }
    );
  }
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 9: IMPLEMENTASIKAN [DELETE] /api/products/[id]
 * ----------------------------------------------------------------------------
 * Tugas Kamu:
 * 1. Ambil `const { id } = await params;`
 * 2. Cek apakah produk dengan ID tersebut ada di store. Jika tidak, return 404.
 * 3. Saring array produk untuk mengeluarkan produk dengan ID tersebut:
 *    `const filtered = products.filter((p) => p.id !== id);`
 * 4. Simpan array baru via `saveStoredProducts(filtered)`.
 * 5. Kembalikan response JSON konfirmasi penghapusan status 200 OK.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 👇 TULIS KODE IMPLEMENTASI TODO 9 (DELETE) KAMU DI SINI:
    // ------------------------------------------------------------------------
    // Langkah 1: const products = getStoredProducts();
    // Langkah 2: const exists = products.some((p) => p.id === id);
    // Langkah 3: if (!exists) { return 404 Not Found }
    // Langkah 4: const filtered = products.filter((p) => p.id !== id);
    // Langkah 5: saveStoredProducts(filtered);
    // Langkah 6: return NextResponse.json({ success: true, message: "Produk berhasil dihapus" })
    // ------------------------------------------------------------------------

    // ❌ Placeholder sebelum kamu lengkapi:
    return NextResponse.json(
      {
        success: false,
        message: `TODO 9 (DELETE /api/products/${id}) belum diimplementasikan! Buka src/app/api/products/[id]/route.ts untuk melengkapinya.`,
      },
      { status: 501 } // 501 Not Implemented
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk", error: String(error) },
      { status: 500 }
    );
  }
}
