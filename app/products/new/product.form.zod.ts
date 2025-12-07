// Path: app/products/new/product.form.zod.ts
// (kept with minor clarity comments)
// ------------------------------

import { z } from "zod";
import { zProductCreateSchema } from "@cloth/shared-types";

const zFormAttribute = zProductCreateSchema.shape.attributes
  .unwrap()
  .element.extend({
    value: z.any().optional().nullable(),
  });

const zFormMedia = zProductCreateSchema.shape.media.unwrap().element.extend({
  kind: z.string(),
  position: z.number(),
});

const zFormInventory = zProductCreateSchema.shape.variants
  .unwrap()
  .element.shape.inventory.unwrap()
  .element.extend({
    quantityOnHand: z.number(),
  });

const zFormVariant = zProductCreateSchema.shape.variants
  .unwrap()
  .element.extend({
    attributes: z.array(zFormAttribute).optional(),
    inventory: z.array(zFormInventory).default([]),
  });

export const zProductFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    categories: z.string().array().min(1, "Select at least one category"),

    defaultCurrency: z.string().default("USD"),

    slug: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    brand: z.string().nullable().default(null),

    type: zProductCreateSchema.shape.type,
    gender: zProductCreateSchema.shape.gender,
    ageGroup: zProductCreateSchema.shape.ageGroup,
    defaultPrice: z.number().nullable().default(null),

    media: z.array(zFormMedia).default([]),
    attributes: z.array(zFormAttribute).default([]),
    variants: z.array(zFormVariant).default([]),
  })
  .strip();

export type ProductFormValues = z.infer<typeof zProductFormSchema>;
