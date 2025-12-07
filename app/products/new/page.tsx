import ProductForm from "./ProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
      <ProductForm />
    </div>
  );
}
