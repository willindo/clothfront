"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getDefaultVariant } from "@/lib/products/category.defaults";
import VariantAttributeRenderer from "@/components/ui/attributes/VariantAttributeRenderer";

export default function ProductVariantBuilder() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const categoryId = watch("categoryId");

  return (
    <div className="border p-6 rounded-xl space-y-6">
      <h2 className="text-xl font-semibold">Variants</h2>

      {!categoryId && (
        <p className="text-gray-500 text-sm">
          Select a category to define variants.
        </p>
      )}
      {categoryId && (
        <Button onClick={() => append(getDefaultVariant(categoryId))}>
          Add Variant
        </Button>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 rounded-lg border space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Variant {index + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>

          <VariantAttributeRenderer index={index} categoryId={categoryId} />
        </div>
      ))}
    </div>
  );
}
