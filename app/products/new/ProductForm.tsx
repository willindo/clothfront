"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { zProductFormSchema, ProductFormValues } from "./product.form.zod";
import { getProductDefaultValues } from "./product.form.utils";
import { formToApi } from "./product.form.transform";

import ProductBasicFields from "./ProductBasicFields";
import ProductAttributesFields from "./ProductsAttributesFields";
import ProductVariantBuilder from "./ProductVariantBuilder";
import ProductMediaUploader from "./ProductMediaUploader";

import { createProduct, updateProduct } from "@/lib/products";
import ProductSubmitBar from "@/components/products/ProductSubmitBar";

interface ProductFormProps {
  mode?: "create" | "edit";
  product?: any;
}

export default function ProductForm({
  mode = "create",
  product,
}: ProductFormProps) {
  const router = useRouter();

  const defaultValues = getProductDefaultValues(product);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(zProductFormSchema as any),
    defaultValues,
    mode: "onChange",
  });

  // Category watcher — keep as-is
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.categories && values.categories.length > 0) {
        // placeholder for loading category-specific attribute sets
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Edit mode reset
  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset(defaultValues);
    }
  }, [product]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      // transform form values -> API payload (validates against zProductCreateSchema)
      const payload = formToApi(values);

      if (mode === "edit" && product) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }

      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("PRODUCT SUBMIT FAILED:", err);
      // optionally: form.setError(...) based on err
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
