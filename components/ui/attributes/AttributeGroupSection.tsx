"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/categoryAttributes.api";
import AttributeRenderer from "./AttributeRenderer";

interface Props {
  categoryId: string | null;
  allowedSlugs?: string[];
}

const AttributeGroupSection: React.FC<Props> = ({
  categoryId,
  allowedSlugs,
}) => {
  const { setValue, getValues } = useFormContext();
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

        let definitions = res || [];

        // enforce category rules
        if (Array.isArray(allowedSlugs)) {
          definitions = definitions.filter((d: any) =>
            allowedSlugs.includes(d.slug),
          );
        }

        setDefs(definitions);

        // ensure defaults exist in map
        const current = getValues("productAttributes") || {};
        const next = { ...current };

        definitions.forEach((def: any) => {
          if (next[def.slug] === undefined) {
            next[def.slug] = def.default ?? "";
          }
        });

        // remove attributes no longer allowed
        Object.keys(next).forEach((slug) => {
          if (!definitions.find((d: any) => d.slug === slug)) {
            delete next[slug];
          }
        });

        setValue("productAttributes", next, { shouldDirty: true });
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryId, allowedSlugs, getValues, setValue]);

  if (!categoryId) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Select a category to view attributes.
      </div>
    );
  }

  if (loading || !defs) {
    return <div className="p-4 text-sm text-gray-500">Loading attributes…</div>;
  }

  return (
    <div className="space-y-4">
      {defs.map((def) => {
        const current = getValues("productAttributes") || {};
        const value = current[def.slug] ?? def.default ?? "";

        return (
          <div key={def.slug} className="p-3 border rounded-md">
            <AttributeRenderer
              attribute={def}
              value={value}
              onChange={(nextValue: any) => {
                const currentMap = getValues("productAttributes") || {};

                setValue(
                  "productAttributes",
                  {
                    ...currentMap,
                    [def.slug]: nextValue,
                  },
                  { shouldDirty: true },
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AttributeGroupSection;
