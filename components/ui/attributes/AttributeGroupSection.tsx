"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getAttributesByCategory } from "@/lib/products/attributes";
import AttributeRenderer from "./AttributeRenderer";

export default function AttributeGroupSection({
  categoryId,
}: {
  categoryId: string | null;
}) {
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
        const arr = res || [];
        setDefs(arr);

        // Initialize form attributes as array of { attributeId, value }
        const current = getValues("attributes") || [];
        const next = Array.isArray(current) ? [...current] : [];

        arr.forEach((attrDef: any) => {
          const exists = next.find((a: any) => a.attributeId === attrDef.id);
          if (!exists) {
            next.push({
              attributeId: attrDef.id,
              value: attrDef.default ?? null,
            });
          }
        });

        // Also remove any attribute entries that no longer exist in defs
        const filtered = next.filter((a: any) =>
          arr.find((d: any) => d.id === a.attributeId)
        );

        setValue("attributes", filtered);
      })
      .catch((err) => {
        console.error("failed to load attributes", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryId]);

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
        const current = (getValues("attributes") || []).find(
          (v: any) => v.attributeId === def.id
        );
        const value = current ? current.value : (def.default ?? null);

        return (
          <div key={def.id} className="p-3 border rounded-md">
            <AttributeRenderer
              attribute={def}
              value={value}
              onChange={(nextValue: any) => {
                const currentArr = getValues("attributes") || [];
                const next = Array.isArray(currentArr) ? [...currentArr] : [];
                const idx = next.findIndex(
                  (a: any) => a.attributeId === def.id
                );
                const payload = { attributeId: def.id, value: nextValue };

                if (idx === -1) next.push(payload);
                else next[idx] = { ...next[idx], value: nextValue };

                setValue("attributes", next);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
