// ============================================================================
// 🎯 TODO 7, TODO 8, & TODO 9: API ROUTE HANDLER INDIVIDUAL (/api/products/[id])
// ============================================================================
// File ini menangani request HTTP ke item produk spesifik berdasarkan ID:
// - GET   /api/products/[id] -> Mengambil detail 1 produk
// - TODO 7: PUT   /api/products/[id] -> Full update (menggantikan seluruh data)
// - TODO 8: PATCH /api/products/[id] -> Partial update (mengubah sebagian atribut)
// - TODO 9: DELETE/api/products/[id] -> Menghapus produk dari katalog
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts } from "@/data/mockProducts";
import { PatchProductInput, UpdateProductInput } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * [GET] /api/products/[id]
 * Mengambil detail satu produk berdasarkan ID.
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
 * 🎯 TODO 7: IMPLEMENTASI [PUT] /api/products/[id] (FULL UPDATE)
 * ----------------------------------------------------------------------------
 * Karakteristik PUT:
 * - Klien wajib mengirimkan SEMUA field produk untuk menggantikan data yang lama.
 * - Jika ada field yang tidak dikirim, field tersebut bisa hilang / ter-reset.
 *
 * Tugas:
 * 1. Ambil `id` dari route params.
 * 2. Parse request body sebagai `UpdateProductInput`.
 * 3. Cari index produk berdasarkan `id`. Jika tidak ada, return 404.
 * 4. Validasi bahwa field utama (title, price, category) dikirimkan lengkap.
 * 5. Timpa seluruh atribut produk lama dengan data baru.
 * 6. Simpan kembali ke store dan return status 200 OK.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: UpdateProductInput = await request.json();

    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    // TODO 7.1: Validasi keberadaan produk
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: `Produk dengan ID '${id}' tidak ditemukan` },
        { status: 404 }
      );
    }

    // TODO 7.2: Validasi kelengkapan field pada PUT (Full Replacement)
    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        {
          success: false,
          message: "Pada metode PUT (Full Update), field title, price, dan category wajib disertakan!",
        },
        { status: 400 }
      );
    }

    // TODO 7.3: Bentuk objek produk yang diperbarui secara menyeluruh
    const existing = products[index];
    const updatedProduct = {
      ...existing,
      title: body.title,
      description: body.description ?? existing.description,
      price: Number(body.price),
      category: body.category,
      imageUrl: body.imageUrl || existing.imageUrl,
      rating: Number(body.rating) ?? existing.rating,
      stock: Number(body.stock) ?? existing.stock,
      isAvailable: Boolean(body.isAvailable),
    };

    // TODO 7.4: Simpan ke store
    products[index] = updatedProduct;
    saveStoredProducts(products);

    return NextResponse.json({
      success: true,
      message: "Data produk berhasil diperbarui secara keseluruhan (PUT)!",
      data: updatedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memproses data PUT", error: String(error) },
      { status: 400 }
    );
  }
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 8: IMPLEMENTASI [PATCH] /api/products/[id] (PARTIAL UPDATE)
 * ----------------------------------------------------------------------------
 * Karakteristik PATCH:
 * - Klien HANYA mengirimkan field yang ingin diubah.
 * - Field lain yang tidak dikirimkan TETAP MEMPERTAHANKAN nilai lamanya.
 * - Sangat efisien untuk: toggle ketersediaan, ubah stok, ubah harga diskon.
 *
 * Tugas:
 * 1. Ambil `id` dari route params.
 * 2. Parse request body sebagai `PatchProductInput`.
 * 3. Cari index produk. Jika tidak ada, return 404.
 * 4. Merge atribut: pertahankan field lama dan timpa HANYA field yang didefinisikan di body.
 * 5. Simpan ke store dan kembalikan response JSON status 200 OK.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: PatchProductInput = await request.json();

    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    // TODO 8.1: Validasi keberadaan produk
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: `Produk dengan ID '${id}' tidak ditemukan` },
        { status: 404 }
      );
    }

    const existing = products[index];

    // TODO 8.2: Lakukan merge hanya untuk field yang ada (tidak undefined)
    const patchedProduct = {
      ...existing,
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.rating !== undefined && { rating: Number(body.rating) }),
      ...(body.stock !== undefined && { stock: Number(body.stock) }),
      ...(body.isAvailable !== undefined && { isAvailable: Boolean(body.isAvailable) }),
    };

    // TODO 8.3: Simpan perubahan ke store
    products[index] = patchedProduct;
    saveStoredProducts(products);

    return NextResponse.json({
      success: true,
      message: "Sebagian atribut produk berhasil diperbarui (PATCH)!",
      data: patchedProduct,
      updatedFields: Object.keys(body),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memproses PATCH", error: String(error) },
      { status: 400 }
    );
  }
}

/**
 * ----------------------------------------------------------------------------
 * 🎯 TODO 9: IMPLEMENTASI [DELETE] /api/products/[id]
 * ----------------------------------------------------------------------------
 * Tugas:
 * 1. Ambil `id` dari route params.
 * 2. Cari produk yang akan dihapus. Jika tidak ada, return 404.
 * 3. Filter array produk untuk mengeluarkan item tersebut.
 * 4. Simpan array yang telah difilter ke store.
 * 5. Kembalikan response JSON konfirmasi penghapusan status 200 OK.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    // TODO 9.1: Validasi keberadaan produk yang akan dihapus
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: `Produk dengan ID '${id}' tidak ditemukan` },
        { status: 404 }
      );
    }

    const deletedProduct = products[index];

    // TODO 9.2: Filter array produk untuk menghapus item
    const filtered = products.filter((p) => p.id !== id);
    saveStoredProducts(filtered);

    // TODO 9.3: Kembalikan response JSON sukses
    return NextResponse.json({
      success: true,
      message: `Produk "${deletedProduct.title}" berhasil dihapus dari katalog!`,
      data: deletedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk", error: String(error) },
      { status: 500 }
    );
  }
}
