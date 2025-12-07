import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Fetch attribute definitions for a given category.
 * Expected backend endpoint: GET /categories/:id/attributes
 * Fallback: GET /attributes?categoryId=...
 */
export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  if (!res.ok) return [];
  return res.json();
}

export async function getAttributesByCategory(categoryId: string) {
  if (!categoryId) return [];

  try {
    // Try category scoped endpoint first
    const res = await api.get(`/categories/${categoryId}/attributes`);
    // assume res.data is array of attribute defs
    return res.data || [];
  } catch (err) {
    // fallback to filter endpoint
    try {
      const res2 = await api.get(`/attributes`, { params: { categoryId } });
      return res2.data || [];
    } catch (e) {
      console.error("failed to fetch attributes for category", categoryId, e);
      return [];
    }
  }
}
