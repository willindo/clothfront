"use client";

import { useFormContext, useWatch } from "react-hook-form";
import AttributeGroupSection from "@/components/ui/attributes/AttributeGroupSection";

export default function ProductAttributesFields() {
  const { control, setValue } = useFormContext();
  const categoryId = useWatch({ control, name: "categoryId" });
  const attributes = useWatch({ control, name: "attributes" });

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

      <AttributeGroupSection categoryId={categoryId} />

      {/* optional: show raw attributes for debugging */}
      {/* <pre>{JSON.stringify(attributes, null, 2)}</pre> */}
    </div>
  );
}
