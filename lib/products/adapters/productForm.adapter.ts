import { ProductFormUI } from "../product.form.ui";
import { CreateProductInput } from "../dto/create-product.dto";

export function mapFormToCreateInput(form: ProductFormUI): CreateProductInput {
  return {
    title: form.title,
    description: form.description || null,

    categories: form.categoryId
      ? [{ categoryId: form.categoryId, isPrimary: true }]
      : [],

    attributes: buildProductAttributes(form),

    variants: form.variants
      .filter((v) =>
        Object.values(v.attributes ?? {}).every(
          (val) => val !== "" && val !== undefined,
        ),
      )
      .map((v) => ({
        sku: v.sku || null,
        priceCents:
          typeof v.price === "number" ? Math.round(v.price * 100) : null,
        attributes: Object.entries(v.attributes ?? {}).map(
          ([attributeSlug, value]) => ({
            attributeSlug,
            value,
          }),
        ),
        inventory: {
          location: "default",
          quantityOnHand: v.stock ?? 0,
        },
      })),
  };
}

export const mapFormToUpdateInput = mapFormToCreateInput;

function buildProductAttributes(form: ProductFormUI) {
  return Object.entries(form.productAttributes ?? {})
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(([attributeSlug, value]) => ({
      attributeSlug,
      value: String(value),
    }));
}
