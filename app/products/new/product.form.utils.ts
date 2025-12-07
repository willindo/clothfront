// Path: app/products/new/product.form.utils.ts
// (kept, but with slightly clarified generics & defaults)
// ------------------------------

import { ProductFormValues } from "./product.form.zod";

export interface RawProductData {
  title: string;
  categories: string[];
  slug?: string | null;
  description?: string | null;
  brand?: string | null;
  media?: {
    url: string;
    altText?: string | null;
    kind?: string | null;
    position?: number | null;
  }[];
  type?: ProductFormValues["type"];
  gender?: ProductFormValues["gender"];
  ageGroup?: ProductFormValues["ageGroup"];
  defaultCurrency?: string | null;
  defaultPrice?: number | null;
  attributes?: any[];
  variants?: any[];
}

const getDeepOrDefault = <T>(
  value: T | undefined | null,
  defaultValue: T
): T => (value === null || typeof value === "undefined" ? defaultValue : value);

export const getProductDefaultValues = (
  product?: RawProductData
): ProductFormValues => {
  const initialAttributes = (product?.attributes || []).map((attr: any) => ({
    attributeSlug: attr.attributeSlug,
    attributeId: attr.attributeId,
    value: attr.value,
  }));

  const initialMedia = (product?.media || []).map((m: any) => ({
    url: m.url,
    altText: getDeepOrDefault(m.altText, null),
    kind: getDeepOrDefault(m.kind, "IMAGE"),
    position: getDeepOrDefault(m.position, 0),
  }));

  const initialVariants = (product?.variants || []).map((v: any) => ({
    sku: v.sku,
    title: v.title,
    priceCents: v.priceCents,
    barcode: v.barcode,
    attributes: v.attributes || [],
    inventory: (v.inventory || []).map((inv: any) => ({
      location: inv.location,
      quantityOnHand: getDeepOrDefault(inv.quantityOnHand, 0),
    })),
  }));

  return {
    title: getDeepOrDefault(product?.title, ""),
    categories: getDeepOrDefault(product?.categories, []),

    defaultCurrency: getDeepOrDefault(product?.defaultCurrency, "USD"),

    slug: getDeepOrDefault(product?.slug, null),
    description: getDeepOrDefault(product?.description, null),
    brand: getDeepOrDefault(product?.brand, null),

    type: product?.type,
    gender: product?.gender,
    ageGroup: product?.ageGroup,
    defaultPrice: getDeepOrDefault(product?.defaultPrice, null),

    media: initialMedia,
    attributes: initialAttributes,
    variants: initialVariants,
  } as ProductFormValues;
};
