"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/categoryAttributes.api";
import { Badge } from "@/components/ui/badge";

type Attr = {
  attributeSlug: string;
  name: string;
  values: { value: string }[];
};

export default function ProductVariantValueSelector() {
  const { control, setValue } = useFormContext();

  // ⬇️ ALL hooks first
  const categoryId = useWatch({ control, name: "categoryId" });
  const selectedAttrs = useWatch({ control, name: "variantAttributes" }) || [];
  const dimensions = useWatch({ control, name: "variantDimensions" }) || {};

  const [attrs, setAttrs] = useState<Attr[]>([]);

  useEffect(() => {
    if (!categoryId || selectedAttrs.length === 0) {
      setAttrs([]);
      return;
    }

    getAttributesByCategory(categoryId).then((data) => {
      setAttrs(
        data.filter((a: any) => selectedAttrs.includes(a.attributeSlug)),
      );
    });
  }, [categoryId, selectedAttrs]);

  // ⬇️ Safe early exit AFTER hooks
  if (!categoryId || attrs.length === 0) return null;

  function toggleValue(attr: string, value: string) {
    const current = dimensions[attr] || [];
    const next = current.includes(value)
      ? current.filter((v: any) => v !== value)
      : [...current, value];

    const nextDims = { ...dimensions };

    if (next.length === 0) {
      delete nextDims[attr];
    } else {
      nextDims[attr] = next;
    }

    setValue("variantDimensions", nextDims, { shouldDirty: true });

    // setValue(
    //   "variantDimensions",
    //   { ...dimensions, [attr]: next },
    //   { shouldDirty: true },
    // );
  }

  return (
    <div className="space-y-6 border p-4 rounded">
      <h3 className="font-semibold">Variant Values</h3>

      {attrs.map((attr) => (
        <div key={attr.attributeSlug} className="space-y-2">
          <p className="font-medium">{attr.name}</p>

          <div className="flex flex-wrap gap-2">
            {attr.values.map((v) => {
              const active = dimensions[attr.attributeSlug]?.includes(v.value);

              return (
                <Badge
                  key={v.value}
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleValue(attr.attributeSlug, v.value)}
                >
                  {v.value}
                </Badge>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
