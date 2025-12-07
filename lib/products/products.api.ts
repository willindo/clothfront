// lib/products/products.api.ts
import {
  zProductCreateSchema,
  zProductUpdateSchema,
  zProductFullSchema,
  zProductListItemSchema,
  zProductWithVariantsSchema,
  zSearchProductsSchema,
} from "@cloth/shared-types";

import { parse } from "../zod";

const API = process.env.NEXT_PUBLIC_API_URL;

// ─────────────────────────────────────────────
// Fetch single product
// GET /products/:id
// ─────────────────────────────────────────────
export async function fetchProduct(id: string) {
  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });
  const json = await res.json();
  return parse(zProductFullSchema, json);
}

// ─────────────────────────────────────────────
// Create product
// POST /products
// ─────────────────────────────────────────────
export async function createProduct(data: unknown) {
  const validated = parse(zProductCreateSchema, data);

  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  if (!res.ok) throw new Error("Failed to create product");

  const json = await res.json();
  return parse(zProductFullSchema, json);
}

// ─────────────────────────────────────────────
// Update product
// PUT /products/:id
// ─────────────────────────────────────────────
export async function updateProduct(id: string, data: unknown) {
  const validated = parse(zProductUpdateSchema, data);

  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  if (!res.ok) throw new Error("Failed to update product");

  const json = await res.json();
  return parse(zProductFullSchema, json);
}

// ─────────────────────────────────────────────
// List products (PLP)
// GET /products?skip&take
// ─────────────────────────────────────────────
export async function listProducts(params?: { skip?: number; take?: number }) {
  const url = new URL(`${API}/products`);

  if (params?.skip) url.searchParams.set("skip", params.skip.toString());
  if (params?.take) url.searchParams.set("take", params.take.toString());

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to list products");

  const json = await res.json();
  return parse(zProductListItemSchema.array(), json);
}

// ─────────────────────────────────────────────
// Search products
// GET /products/search?q=&filters=
// ─────────────────────────────────────────────
export async function searchProducts(params: unknown) {
  const validated = parse(zSearchProductsSchema, params);

  const url = new URL(`${API}/products/search`);
  Object.entries(validated).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Search failed");

  const json = await res.json();
  return parse(zProductWithVariantsSchema.array(), json);
}
