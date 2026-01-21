// lib/products/category.rules.ts

export type CategoryKind = "CLOTHING" | "FOOTWEAR" | "ACCESSORY";

export type VariantKind = "SIZE_COLOR" | "SIZE_ONLY" | "COLOR_ONLY" | "NONE";

export interface CategoryRule {
  kind: CategoryKind;
  variantKind: VariantKind;

  // attributes applied to PRODUCT level
  productAttributes: string[];

  // attributes applied to VARIANT level
  variantAttributes: string[];
  // variantAttributes: ["size", "color"] as const
}

export const CATEGORY_RULES: Record<string, CategoryRule> = {
  // categoryId : rule

  tshirts: {
    kind: "CLOTHING",
    variantKind: "SIZE_COLOR",
    productAttributes: ["brand", "material", "fit"],
    variantAttributes: ["size", "color"],
  },

  pants: {
    kind: "CLOTHING",
    variantKind: "SIZE_ONLY",
    productAttributes: ["brand", "material", "fit"],
    variantAttributes: ["size"],
  },

  shoes: {
    kind: "FOOTWEAR",
    variantKind: "SIZE_ONLY",
    productAttributes: ["brand", "material"],
    variantAttributes: ["size"],
  },

  caps: {
    kind: "ACCESSORY",
    variantKind: "NONE",
    productAttributes: ["brand", "material"],
    variantAttributes: [],
  },
};
