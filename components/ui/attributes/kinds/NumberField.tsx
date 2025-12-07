"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NumberField({ field, attribute }: any) {
  return (
    <div className="space-y-2">
      <Label>{attribute.name}</Label>
      <Input type="number" {...field} />
    </div>
  );
}
