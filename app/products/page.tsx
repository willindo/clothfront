// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
type Product = {
  id: string | number;
  title: string;
  slug: string;
  brand?: string | null;
};
export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>

      {products.length === 0 && <div>No products found.</div>}

      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded-lg">
            <div className="font-medium text-lg">{p.title}</div>
            <div className="text-sm opacity-70">Slug: {p.slug}</div>
            <div className="text-sm opacity-70">Brand: {p.brand}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
