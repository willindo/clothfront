import { CATEGORY_RULES } from "./category.rules";
import { ProductVariantForm } from "./product.form.ui";

export function getDefaultVariant(categoryId: string): ProductVariantForm {
  const rule = CATEGORY_RULES[categoryId];

  if (!rule) {
    return {
      kind: "NONE",
      attributes: {},
      stock: 0,
      priceAdjustment: 0,
    };
  }

  switch (rule.variantKind) {
    case "SIZE_COLOR":
      return {
        kind: "SIZE_COLOR",
        attributes: { size: "", color: "" },
        stock: 0,
        priceAdjustment: 0,
      };

    case "SIZE_ONLY":
      return {
        kind: "SIZE_ONLY",
        attributes: { size: "" },
        stock: 0,
        priceAdjustment: 0,
      };

    case "COLOR_ONLY":
      return {
        kind: "COLOR_ONLY",
        attributes: { color: "" },
        stock: 0,
        priceAdjustment: 0,
      };

    case "NONE":
    default:
      return {
        kind: "NONE",
        attributes: {},
        stock: 0,
        priceAdjustment: 0,
      };
  }
}
