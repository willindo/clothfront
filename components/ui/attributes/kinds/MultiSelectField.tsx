"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function MultiSelectField({ field, attribute }: any) {
  const values: string[] = field.value || [];

  const toggle = (v: string) => {
    if (values.includes(v)) {
      field.onChange(values.filter((x) => x !== v));
    } else {
      field.onChange([...values, v]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{attribute.name}</Label>

      <div className="flex flex-col gap-2">
        {attribute.options?.map((opt: any) => (
          <label key={opt.value} className="flex items-center gap-2">
            <Checkbox
              checked={values.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
