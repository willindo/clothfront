"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";

import ProductBasicFields from "./ProductBasicFields";
import ProductAttributesFields from "./ProductsAttributesFields";
import ProductVariantBuilder from "./ProductVariantBuilder";
// import ProductMediaUploader from "./ProductMediaUploader";
import ProductSubmitBar from "./ProductSubmitBar";
import {
  PRODUCT_FORM_DEFAULTS,
  ProductFormUI,
} from "@/lib/products/product.form.ui";

import { createProduct, updateProduct } from "@/lib/products/products.service";

interface ProductFormProps {
  mode?: "create" | "edit";
  product?: Partial<ProductFormUI> & { id?: string };
}

export default function ProductForm({
  mode = "create",
  product,
}: ProductFormProps) {
  const router = useRouter();

  const form = useForm<ProductFormUI>({
    defaultValues: PRODUCT_FORM_DEFAULTS,
    mode: "onChange",
  });

  /* -------------------------------
     Category watcher (safe)
  -------------------------------- */
  useEffect(() => {
    const subscription = form.watch((values) => {
      // if (values.categories?.length) {
      // load category-based attributes later
      // }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  /* -------------------------------
     Edit mode reset (RHF-native)
  -------------------------------- */
  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset({
        ...PRODUCT_FORM_DEFAULTS,
        ...product,
      });
    }
  }, [mode, product, form]);

  /* -------------------------------
     Submit (RHF-only for now)
  -------------------------------- */
  const onSubmit = async (values: ProductFormUI) => {
    try {
      if (mode === "edit" && product?.id) {
        await updateProduct(product.id, values);
      } else {
        await createProduct(values);
      }

      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("PRODUCT SUBMIT FAILED:", err);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 pb-16">
        <ProductBasicFields />
        <ProductAttributesFields />
        <ProductVariantBuilder />
        {/* <ProductMediaUploader /> */}

        <ProductSubmitBar
          mode={mode}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
}
// | Component               | Responsibility               |
// | ----------------------- | ---------------------------- |
// | ProductBasicFields      | title, description, category |
// | ProductAttributesFields | brand, material, fit         |
// | ProductVariantBuilder   | full variant engine          |
// | ProductSubmitBar        | submit UX                    |
