"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function BooleanField({ field, attribute }: any) {
  const checked = !!field.value;

  return (
    <div className="flex items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={field.onChange} />
      <Label>{attribute.name}</Label>
    </div>
  );
}
