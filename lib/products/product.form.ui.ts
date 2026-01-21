// RHF-only type (UI state, NOT API)
export interface ProductFormUI {
  // name: string;
  title: string; //added
  description?: string;
  price?: number;
  currency?: string;
  categoryId?: string;
  variantDimensions: {
    [attributeSlug: string]: string[];
  }; //added
  productAttributes?: Record<string, string | number | boolean>; //added
  // attributes: {
  //   attributeId?: string;
  //   attributeSlug?: string;
  //   value?: any;
  // }[];

  variants: ProductVariantForm[];
}
export type VariantBase = {
  sku?: string; // ✅ UI-only
  price?: number; // ✅ UI-only (₹ / $)
  stock?: number;
  priceAdjustment?: number;
};

export type SizeColorVariant = VariantBase & {
  kind: "SIZE_COLOR";
  attributes: {
    size: string;
    color: string;
  };
};

export type SizeOnlyVariant = VariantBase & {
  kind: "SIZE_ONLY";
  attributes: {
    size: string;
  };
};

export type ColorOnlyVariant = VariantBase & {
  kind: "COLOR_ONLY";
  attributes: {
    color: string;
  };
};

export type NoVariant = VariantBase & {
  kind: "NONE";
  attributes: {};
};

export type ProductVariantForm =
  | SizeColorVariant
  | SizeOnlyVariant
  | ColorOnlyVariant
  | NoVariant;

export const PRODUCT_FORM_DEFAULTS: ProductFormUI = {
  title: "",
  description: "",

  price: undefined,
  currency: undefined,

  categoryId: undefined,

  // Non-variant attributes (brand, material, etc.)
  productAttributes: {},

  // Variant dimensions (e.g. { size: ["S", "M"], color: ["Red"] })
  variantDimensions: {},

  // Generated variants table
  variants: [],
};
