"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/lib/products";

export default function ProductCategoryField() {
  const { setValue, watch } = useFormContext();

  const [categories, setCategories] = useState<any[]>([]);
  const categoryId = watch("categoryId");

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data || []);
    }
    load();
  }, []);

  return (
    <div className="space-y-2">
      <Label>Category</Label>

      <Select
        value={categoryId}
        onValueChange={(v) => {
          setValue("categoryId", v, { shouldDirty: true });
          setValue("productAttributes", {});
          setValue("variants", []); // reset variants
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category…" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((cat: any) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
