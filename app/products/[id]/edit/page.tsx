import { getProductById } from "@/lib/api/productsa";
import ProductForm from "../../new/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-medium">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
