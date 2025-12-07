import { ZodSchema, z } from "zod";

export function parse<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeParse<T>(schema: ZodSchema<T>, data: unknown) {
  return schema.safeParse(data);
}

export const AttributeValueSchema = z.object({
  id: z.string().optional(),
  attributeId: z.string(),
  value: z.any(),
});

export const VariantSchema = z.object({
  id: z.string().optional(),
  attributes: z.record(z.string(), z.any()),
  stock: z.number().optional().default(0),
  priceAdjustment: z.number().optional().default(0),
});

export const MediaSchema = z.object({
  id: z.string().optional(),
  url: z.string().url(),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
  categoryId: z.string().min(1),

  attributes: z.array(AttributeValueSchema),
  variants: z.array(VariantSchema),

  media: z.array(MediaSchema),
});

export type ProductInput = z.infer<typeof ProductSchema>;
