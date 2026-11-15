// ============================================================================
// Konfigurasi Endpoint REST API Eksternal
// Membaca variabel environment dari .env (NEXT_PUBLIC_*)
// ============================================================================

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api-mentor.bemfilkomub.cloud/api/v1/products";

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "ECR2XaRDj489rHJJ";

// Header default yang wajib disertakan pada setiap request fetch
export const getApiHeaders = () => ({
  "Content-Type": "application/json",
  "X-API-Key": API_KEY,
});
