"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductCategoryField from "./ProductCategoryField";

export default function ProductBasicFields() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 border p-6 rounded-xl">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <div className="space-y-2">
        <label className="font-medium">Product Name</label>
        <Input {...register("name")} placeholder="e.g. Cotton T-shirt" />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Description</label>
        <Textarea
          {...register("description")}
          placeholder="Product details, materials, and selling points…"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Price (₹)</label>
        <Input type="number" step="0.01" {...register("price")} />
      </div>

      {/* Category selector */}
      <ProductCategoryField />
    </div>
  );
}
