import { ProductUpdateInput } from "./products/products.types";
import { ProductFormUI } from "./products/product.form.ui";

export function mapFormToUpdateInput(form: ProductFormUI): ProductUpdateInput {
  return {
    title: form.title,
    description: form.description,

    categories: form.categoryId ? [form.categoryId] : undefined,

    attributes: normalizeAttributes(form.productAttributes),

    variants: form.variants.map((v) => ({
      attributes: normalizeVariantAttributes(v.attributes),

      priceCents:
        typeof v.priceAdjustment === "number"
          ? Math.round(v.priceAdjustment * 100)
          : undefined,

      inventory: [
        {
          location: "default",
          quantityOnHand: v.stock ?? 0,
        },
      ],
    })),
  };
}

function normalizeAttributes(
  attrs: {
    attributeId?: string;
    attributeSlug?: string;
    value?: any;
  }[],
): {
  attributeId?: string;
  attributeSlug?: string;
  value: any;
}[] {
  return attrs
    .filter((a) => a.value !== undefined)
    .map((a) => ({
      attributeId: a.attributeId,
      attributeSlug: a.attributeSlug,
      value: a.value,
    }));
}
function normalizeVariantAttributes(attrs: Record<string, any>): {
  attributeSlug: string;
  value: any;
}[] {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([slug, value]) => ({
      attributeSlug: slug,
      value,
    }));
}
