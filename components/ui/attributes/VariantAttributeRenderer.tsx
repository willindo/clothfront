"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/categoryAttributes.api";
import AttributeRenderer from "./AttributeRenderer";
import { CATEGORY_RULES } from "@/lib/products/category.rules";

interface VariantAttributeRendererProps {
  index: number;
  categoryId?: string | null;
}

export default function VariantAttributeRenderer({
  index,
  categoryId,
}: VariantAttributeRendererProps) {
  const { getValues, setValue } = useFormContext();

  const [defs, setDefs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------
     Load attribute definitions (TEMP: all attrs)
     STEP 2 will restrict to variantAttributes
  -------------------------------------------- */
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

        const rule = CATEGORY_RULES[categoryId].variantAttributes;

        const allowed = rule ?? [];

        const definitions = (res || []).filter((d: any) =>
          allowed.includes(d.slug),
        );

        setDefs(definitions);
      })

      .catch((err) => {
        console.error("failed to load variant attrs", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryId]);

  /* -------------------------------------------
     Guards
  -------------------------------------------- */
  if (!categoryId) {
    return (
      <div className="text-sm text-gray-500">
        Select category to load variant attributes.
      </div>
    );
  }

  if (loading || !defs) {
    return (
      <div className="text-sm text-gray-500">Loading variant attributes…</div>
    );
  }

  /* -------------------------------------------
     Read current variant state
  -------------------------------------------- */
  const variants = getValues("variants") || [];
  const variant = variants[index] || {};
  const attributes: Record<string, any> =
    typeof variant.attributes === "object" && variant.attributes !== null
      ? variant.attributes
      : {};

  /* -------------------------------------------
     Render
  -------------------------------------------- */
  return (
    <div className="space-y-3">
      {defs.map((def) => {
        const slug = def.slug;
        const value = attributes[slug] ?? def.default ?? "";

        return (
          <div key={def.id} className="p-2 border rounded-md">
            <AttributeRenderer
              attribute={def}
              value={value}
              onChange={(nextValue: any) => {
                const nextVariants = [...variants];

                nextVariants[index] = {
                  ...variant,
                  attributes: {
                    ...attributes,
                    [slug]: nextValue,
                  },
                };

                setValue(`variants.${index}.attributes.${slug}`, nextValue, {
                  shouldDirty: true,
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
