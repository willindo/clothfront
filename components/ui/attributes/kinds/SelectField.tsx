"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectField({ field, attribute }: any) {
  return (
    <div className="space-y-2">
      <Label>{attribute.name}</Label>

      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${attribute.name}`} />
        </SelectTrigger>
        <SelectContent>
          {attribute.options?.map((opt: any) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
