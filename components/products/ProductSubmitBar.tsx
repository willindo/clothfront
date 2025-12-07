"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function ProductSubmitBar({
  mode,
  isSubmitting,
}: {
  mode: "create" | "edit";
  isSubmitting: boolean;
}) {
  return (
    <div className="pt-4 border-t">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : mode === "edit"
            ? "Update Product"
            : "Save Product"}
      </Button>
    </div>
  );
}
