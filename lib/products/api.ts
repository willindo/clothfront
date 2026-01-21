import axios from "axios";
import { CreateProductInput } from "./dto/create-product.dto";

const API_BASE = "http://localhost:3001";

export async function createProduct(payload: CreateProductInput) {
  const res = await axios.post(`${API_BASE}/products`, payload);
  return res.data;
}

export async function updateProduct(
  productId: string,
  payload: CreateProductInput,
) {
  const res = await axios.patch(`${API_BASE}/products/${productId}`, payload);
  return res.data;
}
