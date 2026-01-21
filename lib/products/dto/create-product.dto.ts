export interface CreateProductInput {
  title: string;
  description: string | null;

  categories: {
    categoryId: string;
    isPrimary: boolean;
  }[];

  attributes: {
    attributeSlug: string;
    value: string;
  }[];

  variants: {
    sku: string | null;
    priceCents: number | null;

    attributes: {
      attributeSlug: string;
      value: string;
    }[];

    inventory: {
      location: string;
      quantityOnHand: number;
    };
  }[];
}
