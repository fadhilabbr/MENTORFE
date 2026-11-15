// ============================================================================
// Data Model & DTOs untuk API Toko Backend
// Endpoint: https://api-mentor.bemfilkomub.cloud/api/v1/products
// ============================================================================

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

// Payload untuk membuat produk baru (POST)
export type CreateProductInput = Omit<Product, "id" | "created_at" | "updated_at">;

// Payload untuk full update (PUT)
export type UpdateProductInput = Omit<Product, "id" | "created_at" | "updated_at">;

// Payload untuk partial update (PATCH)
export type PatchProductInput = Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
