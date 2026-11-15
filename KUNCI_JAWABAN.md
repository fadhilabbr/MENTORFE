# 🔑 Kunci Jawaban & Solusi Referensi (TODO 1 s/d TODO 10)

> 💡 **Tips**: Cobalah mengerjakan TODO di dalam kode terlebih dahulu. Buka dokumen ini hanya jika kamu membutuhkan referensi atau mengalami kendala saat menyelesaikan latihan!

---

## 📌 TODO 1: Data Model & TypeScript DTOs (`src/types/product.ts`)

```typescript
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
  isAvailable: boolean; // Field untuk latihan PATCH
  createdAt: string;
}

// 1.1 DTO Create: Omit id dan createdAt
export type CreateProductInput = Omit<Product, "id" | "createdAt">;

// 1.2 DTO Update (PUT): Seluruh atribut utama dikirim ulang
export type UpdateProductInput = Omit<Product, "id" | "createdAt">;

// 1.3 DTO Patch (PATCH): Semua atribut bersifat opsional
export type PatchProductInput = Partial<Omit<Product, "id" | "createdAt">>;
```

---

## 📌 TODO 5: [GET] /api/products (`src/app/api/products/route.ts`)

```typescript
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    let products = getStoredProducts();

    // Filter Search
    if (search) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    // Filter Kategori
    if (category && category !== "Semua") {
      products = products.filter((p) => p.category === category);
    }

    // Filter Status Ketersediaan
    if (status === "available") {
      products = products.filter((p) => p.isAvailable);
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat produk", error: String(error) },
      { status: 500 }
    );
  }
}
```

---

## 📌 TODO 6: [POST] /api/products (`src/app/api/products/route.ts`)

```typescript
export async function POST(request: NextRequest) {
  try {
    const body: CreateProductInput = await request.json();

    // Validasi
    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: "Field title, price, dan category wajib diisi!" },
        { status: 400 }
      );
    }

    const currentProducts = getStoredProducts();

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: body.title.trim(),
      description: body.description || "",
      price: Number(body.price),
      category: body.category,
      imageUrl:
        body.imageUrl ||
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
      rating: Number(body.rating) || 5.0,
      stock: Number(body.stock) || 0,
      isAvailable: body.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    };

    saveStoredProducts([newProduct, ...currentProducts]);

    return NextResponse.json(
      { success: true, message: "Produk berhasil ditambahkan!", data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Payload tidak valid", error: String(error) },
      { status: 400 }
    );
  }
}
```

---

## 📌 TODO 7: [PUT] /api/products/[id] (`src/app/api/products/[id]/route.ts`)

```typescript
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: UpdateProductInput = await request.json();

    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap!" },
        { status: 400 }
      );
    }

    const existing = products[index];
    const updated = {
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

    products[index] = updated;
    saveStoredProducts(products);

    return NextResponse.json({
      success: true,
      message: "Produk berhasil di-update (PUT)",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
```

---

## 📌 TODO 8: [PATCH] /api/products/[id] (`src/app/api/products/[id]/route.ts`)

```typescript
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: PatchProductInput = await request.json();

    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const existing = products[index];

    // Gabungkan HANYA field yang dikirim (tidak undefined)
    const patched = {
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

    products[index] = patched;
    saveStoredProducts(products);

    return NextResponse.json({
      success: true,
      message: "Sebagian field berhasil di-patch!",
      data: patched,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
```

---

## 📌 TODO 9: [DELETE] /api/products/[id] (`src/app/api/products/[id]/route.ts`)

```typescript
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const deleted = products[index];
    const filtered = products.filter((p) => p.id !== id);
    saveStoredProducts(filtered);

    return NextResponse.json({
      success: true,
      message: `Produk "${deleted.title}" berhasil dihapus!`,
      data: deleted,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
```

---

## 📌 TODO 10: Consuming API di Frontend (`src/app/page.tsx`)

### 10-B: POST (Create)
```typescript
const handleCreateProduct = async (formData: CreateProductInput) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);

  setProducts((prev) => [json.data, ...prev]);
  addToast({ type: "success", title: "Produk Dibuat!", methodBadge: "POST" });
};
```

### 10-C: PUT (Update Full)
```typescript
const handleUpdateProduct = async (formData: CreateProductInput) => {
  if (!editingProduct) return;
  const res = await fetch(`/api/products/${editingProduct.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message);

  setProducts((prev) =>
    prev.map((item) => (item.id === editingProduct.id ? json.data : item))
  );
  addToast({ type: "success", title: "Produk Diperbarui (PUT)", methodBadge: "PUT" });
};
```

### 10-D: PATCH (Toggle Status & Stock)
```typescript
// Toggle Ketersediaan
const handlePatchToggleAvailability = async (product: Product) => {
  const newStatus = !product.isAvailable;
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isAvailable: newStatus }),
  });
  const json = await res.json();
  if (!res.ok) return;

  setProducts((prev) =>
    prev.map((item) => (item.id === product.id ? json.data : item))
  );
  addToast({ type: "success", title: "Status Berhasil Di-PATCH!", methodBadge: "PATCH" });
};

// Ubah Stok (+/- delta)
const handlePatchQuickStock = async (product: Product, delta: number) => {
  const newStock = Math.max(0, product.stock + delta);
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: newStock }),
  });
  const json = await res.json();
  if (!res.ok) return;

  setProducts((prev) =>
    prev.map((item) => (item.id === product.id ? json.data : item))
  );
  addToast({ type: "success", title: "Stok Berhasil Di-PATCH!", methodBadge: "PATCH" });
};
```

### 10-E: DELETE (Hapus)
```typescript
const handleDeleteProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) return;

  setProducts((prev) => prev.filter((item) => item.id !== id));
  addToast({ type: "success", title: "Produk Berhasil Dihapus!", methodBadge: "DELETE" });
};
```
