"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/categoryAttributes.api";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductVariantDimensionSelector() {
  const { setValue, control, getValues } = useFormContext();

  // ⬇️ ALL hooks FIRST
  const categoryId = useWatch({ control, name: "categoryId" });
  const selected = useWatch({ control, name: "variantAttributes" }) || [];

  const [attrs, setAttrs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ⬇️ Safe effect
  useEffect(() => {
    if (!categoryId) {
      setAttrs([]);
      return;
    }

    setLoading(true);
    getAttributesByCategory(categoryId).then((data) => {
      setAttrs(data.filter((a: any) => a.variantAllowed));
      setLoading(false);
    });
  }, [categoryId]);

  // ⬇️ AFTER hooks — safe early exit
  if (!categoryId || loading || attrs.length === 0) return null;

  function toggle(slug: string) {
    const next = selected.includes(slug)
      ? selected.filter((s: any) => s !== slug)
      : [...selected, slug];

    if (selected.includes(slug)) {
      const nextDims = { ...getValues("variantDimensions") };
      delete nextDims[slug];
      setValue("variantDimensions", nextDims, { shouldDirty: true });
    }

    setValue("variantAttributes", next, { shouldDirty: true });
  }

  return (
    <div className="space-y-3 border p-4 rounded">
      <h3 className="font-semibold">Variant Attributes</h3>

      {attrs.map((attr) => (
        <label key={attr.attributeSlug} className="flex gap-2 items-center">
          <Checkbox
            checked={selected.includes(attr.attributeSlug)}
            onCheckedChange={() => toggle(attr.attributeSlug)}
          />
          {attr.name}
        </label>
      ))}
    </div>
  );
}
