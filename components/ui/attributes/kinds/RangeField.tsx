"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function RangeField({ field, attribute }: any) {
  const value = field.value ?? [attribute.min ?? 0];

  return (
    <div className="space-y-2">
      <Label>{attribute.name}</Label>

      <Slider
        min={attribute.min ?? 0}
        max={attribute.max ?? 100}
        step={attribute.step ?? 1}
        value={value}
        onValueChange={(v) => field.onChange(v)}
      />

      <div className="text-sm text-muted-foreground">{value}</div>
    </div>
  );
}
