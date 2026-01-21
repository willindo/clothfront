"use client";

import { useFormContext, useWatch } from "react-hook-form";
import AttributeGroupSection from "@/components/ui/attributes/AttributeGroupSection";
import { CATEGORY_RULES } from "@/lib/products/category.rules";

export default function ProductAttributesFields() {
  const { control, setValue } = useFormContext();
  const categoryId = useWatch({ control, name: "categoryId" });

  if (!categoryId) {
    return (
      <div className="border p-6 rounded-xl opacity-50">
        <p className="text-sm text-gray-500">
          Select a category to load attributes.
        </p>
      </div>
    );
  }

  return (
    <div className="border p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Attributes</h2>

      <AttributeGroupSection
        categoryId={categoryId}
        allowedSlugs={CATEGORY_RULES[categoryId]?.productAttributes}
      />

      {/* optional: show raw attributes for debugging */}
      {/* <pre>{JSON.stringify(attributes, null, 2)}</pre> */}
    </div>
  );
}
