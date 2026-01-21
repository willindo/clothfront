// product.form.types.ts
export interface ProductFormDomain {
  title: string;
  description?: string | null;
  brand?: string | null;

  categories: string[];

  defaultCurrency: string;
  defaultPrice: number | null;

  type?: "TOP" | "BOTTOM" | "SET" | "OUTERWEAR" | "FOOTWEAR" | "ACCESSORY";
  gender?: "MALE" | "FEMALE" | "UNISEX" | "OTHER";
  ageGroup?: "ADULT" | "TEEN" | "KIDS" | "TODDLER" | "INFANT";

  attributes: {
    attributeSlug?: string;
    attributeId?: string;
    value?: any;
  }[];

  variants: {
    sku?: string;
    title?: string;
    priceCents?: number;
    barcode?: string;
    attributes?: {
      attributeSlug?: string;
      attributeId?: string;
      value?: any;
    }[];
    inventory: {
      location?: string;
      quantityOnHand: number;
    }[];
  }[];
}
export const PRODUCT_FORM_DEFAULTS: ProductFormDomain = {
  title: "",
  description: null,
  brand: null,

  categories: [],

  defaultCurrency: "INR",
  defaultPrice: null,

  type: undefined,
  gender: undefined,
  ageGroup: undefined,

  attributes: [],
  variants: [],
};
