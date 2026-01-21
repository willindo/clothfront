// import { ProductCreateInput } from "@cloth/shared-types";
import { ProductCreateInput } from "./products/products.types";
import { ProductFormUI } from "./products/product.form.ui";

export function mapFormToCreateInput(form: ProductFormUI): ProductCreateInput {
  if (!form.categoryId) {
    throw new Error("Category is required to create a product");
  }

  return {
    title: form.title,
    description: form.description,
    defaultCurrency: form.currency ?? "INR",

    categories: [form.categoryId],

    attributes: normalizeAttributes(form.attributes),

    variants: form.variants.map((v) => ({
      attributes: normalizeVariantAttributes(v.attributes),

      priceCents:
        typeof v.priceAdjustment === "number"
          ? Math.round(v.priceAdjustment * 100)
          : Math.round((form.price ?? 0) * 100),

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
