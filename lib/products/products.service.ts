import { ProductFormUI } from "./product.form.ui";
import {
  mapFormToCreateInput,
  mapFormToUpdateInput,
} from "./adapters/productForm.adapter";
import {
  createProduct as createProductApi,
  updateProduct as updateProductApi,
} from "./api";

export async function createProduct(form: ProductFormUI) {
  const payload = mapFormToCreateInput(form);
  return createProductApi(payload);
}

export async function updateProduct(productId: string, form: ProductFormUI) {
  const payload = mapFormToUpdateInput(form);
  return updateProductApi(productId, payload);
}
