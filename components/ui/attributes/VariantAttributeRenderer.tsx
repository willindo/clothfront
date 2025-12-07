"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/attributes";
import AttributeRenderer from "./AttributeRenderer";

export default function VariantAttributeRenderer({
  index,
  categoryId,
}: {
  index: number;
  categoryId?: string | null;
}) {
  const { getValues, setValue } = useFormContext();
  const [defs, setDefs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setDefs(null);
      return;
    }

    let mounted = true;
    setLoading(true);

    getAttributesByCategory(categoryId)
      .then((res) => {
        if (!mounted) return;
        setDefs(res || []);

        // Initialize variants[index].attributes to array of { attributeId, value }
        const variants = getValues("variants") || [];
        const variant = variants[index] || { attributes: [] };
        const nextAttrs = Array.isArray(variant.attributes)
          ? [...variant.attributes]
          : [];

        (res || []).forEach((def: any) => {
          const exists = nextAttrs.find((a: any) => a.attributeId === def.id);
          if (!exists)
            nextAttrs.push({ attributeId: def.id, value: def.default ?? null });
        });

        const nextVariants = [...variants];
        nextVariants[index] = {
          ...(nextVariants[index] || {}),
          attributes: nextAttrs,
        };
        setValue("variants", nextVariants);
      })
      .catch((err) => console.error("failed to load variant attrs", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryId, index]);

  if (!categoryId)
    return (
      <div className="text-sm text-gray-500">
        Select category to load variant attributes.
      </div>
    );
  if (loading || !defs)
    return (
      <div className="text-sm text-gray-500">Loading variant attributes…</div>
    );

  const variant = (getValues("variants") || [])[index] || { attributes: [] };
  const attrs = Array.isArray(variant.attributes) ? variant.attributes : [];

  return (
    <div className="space-y-3">
      {defs.map((def) => {
        const cur = attrs.find((a: any) => a.attributeId === def.id);
        const value = cur ? cur.value : (def.default ?? null);

        return (
          <div key={def.id} className="p-2 border rounded-md">
            <AttributeRenderer
              attribute={def}
              value={value}
              onChange={(nextValue: any) => {
                const variants = getValues("variants") || [];
                const nextVariants = Array.isArray(variants)
                  ? [...variants]
                  : [];
                const variantObj = nextVariants[index] || { attributes: [] };
                const nextAttrs = Array.isArray(variantObj.attributes)
                  ? [...variantObj.attributes]
                  : [];

                const idx = nextAttrs.findIndex(
                  (a: any) => a.attributeId === def.id
                );
                const payload = { attributeId: def.id, value: nextValue };

                if (idx === -1) nextAttrs.push(payload);
                else nextAttrs[idx] = { ...nextAttrs[idx], value: nextValue };

                nextVariants[index] = {
                  ...(nextVariants[index] || {}),
                  attributes: nextAttrs,
                };
                setValue("variants", nextVariants);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
