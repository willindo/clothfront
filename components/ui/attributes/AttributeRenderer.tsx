"use client";

import React from "react";
import TextField from "./kinds/TextField";
import NumberField from "./kinds/NumberField";
import BooleanField from "./kinds/BooleanField";
import SelectField from "./kinds/SelectField";
import MultiSelectField from "./kinds/MultiSelectField";
import RangeField from "./kinds/RangeField";

type Props = {
  attribute: any;
  value: any;
  onChange: (v: any) => void;
};

export default function AttributeRenderer({
  attribute,
  value,
  onChange,
}: Props) {
  // SYSTEM B uses string literal kinds (not runtime enum values)
  const map: Record<string, any> = {
    TEXT: TextField,
    NUMBER: NumberField,
    BOOLEAN: BooleanField,
    SELECT: SelectField,
    MULTI_SELECT: MultiSelectField,
    RANGE: RangeField,
  };

  const Component = map[attribute.kind];
  if (!Component) return null;

  return (
    <div className="space-y-1">
      <label className="block font-medium">{attribute.name}</label>

      <Component attribute={attribute} value={value} onChange={onChange} />

      {attribute.description && (
        <p className="text-sm text-gray-500">{attribute.description}</p>
      )}
    </div>
  );
}
