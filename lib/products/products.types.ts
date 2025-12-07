import {
  zProductCreateSchema,
  zProductUpdateSchema,
  zProductFullSchema,
  zProductListItemSchema,
  zProductWithVariantsSchema,
} from "@cloth/shared-types";
import { z } from "zod";

export type ProductCreateInput = z.infer<typeof zProductCreateSchema>;
export type ProductUpdateInput = z.infer<typeof zProductUpdateSchema>;
export type ProductFull = z.infer<typeof zProductFullSchema>;
export type ProductListItem = z.infer<typeof zProductListItemSchema>;
export type ProductWithVariants = z.infer<typeof zProductWithVariantsSchema>;
