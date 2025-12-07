// Path: app/products/new/product.form.transform.ts
// ------------------------------

import { zProductCreateSchema } from "@cloth/shared-types";
import { ProductFormValues } from "./product.form.zod";

/**
 * Convert ProductFormValues -> payload that matches zProductCreateSchema
 * - strips UI-only nulls/empties
 * - ensures defaulted fields are set to undefined when absent (so API defaults can apply)
 * - normalizes nested arrays
 */
export function formToApi(values: ProductFormValues) {
  const cleaned = {
    title: values.title,
    categories: values.categories,

    // optional text fields: send undefined when null/empty so API doesn't receive "null"
    slug: values.slug ?? undefined,
    description: values.description ?? undefined,
    brand: values.brand ?? undefined,

    type: values.type ?? undefined,
    gender: values.gender ?? undefined,
    ageGroup: values.ageGroup ?? undefined,
    defaultCurrency: values.defaultCurrency ?? undefined,
    defaultPrice: values.defaultPrice ?? undefined,

    media: (values.media || []).map((m) => ({
      url: m.url,
      altText: m.altText ?? undefined,
      kind: m.kind,
      position: m.position,
    })),

    attributes: (values.attributes || []).map((a) => ({
      attributeSlug: a.attributeSlug,
      attributeId: a.attributeId,
      value: a.value === undefined ? null : a.value,
    })),

    variants: (values.variants || []).map((v) => ({
      sku: v.sku,
      title: v.title,
      priceCents: v.priceCents,
      barcode: v.barcode ?? undefined,
      attributes: v.attributes ?? [],
      inventory: (v.inventory || []).map((i) => ({
        location: i.location,
        quantityOnHand: i.quantityOnHand ?? 0,
      })),
    })),
  };

  // final parse/validation against API schema — throws if mismatch
  return zProductCreateSchema.parse(cleaned);
}
