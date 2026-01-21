"use client";

import { useFormContext, useWatch, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function ProductVariantsTable() {
  const { control } = useFormContext();

  const variants = useWatch({ control, name: "variants" }) || [];

  if (variants.length === 0) return null;

  const dimensionKeys = Object.keys(variants[0]?.attributes || {});

  return (
    <div className="border rounded p-4 space-y-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {dimensionKeys.map((k) => (
              <th key={k} className="border p-2 capitalize">
                {k}
              </th>
            ))}
            <th className="border p-2">SKU</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((variant: any, index: any) => (
            <tr key={variant.id}>
              {dimensionKeys.map((k) => (
                <td key={k} className="border p-2">
                  {variant.attributes[k]}
                </td>
              ))}

              <td className="border p-2">
                <Controller
                  name={`variants.${index}.sku`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="SKU" />}
                />
              </td>

              <td className="border p-2">
                <Controller
                  name={`variants.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <Input type="number" {...field} placeholder="Price" />
                  )}
                />
              </td>

              <td className="border p-2">
                <Controller
                  name={`variants.${index}.stock`}
                  control={control}
                  render={({ field }) => (
                    <Input type="number" {...field} placeholder="Stock" />
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
