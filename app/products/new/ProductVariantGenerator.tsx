"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { nanoid } from "nanoid";
import { cartesian } from "@/lib/products/variant.cartesian";
import { Button } from "@/components/ui/button";

export default function ProductVariantGenerator() {
  const { control, setValue } = useFormContext();

  const dimensions = useWatch({ control, name: "variantDimensions" }) || {};

  function generate() {
    const combos = cartesian(dimensions);

    const variants = combos.map((attrs) => ({
      id: nanoid(),
      attributes: attrs,
      price: null,
      stock: null,
      sku: null,
      images: [],
    }));

    setValue("variants", variants, { shouldDirty: true });
  }

  const canGenerate = Object.values(dimensions).some((v: any) => v.length > 0);

  if (!canGenerate) return null;

  return (
    <Button type="button" onClick={generate}>
      Generate Variants
    </Button>
  );
}
