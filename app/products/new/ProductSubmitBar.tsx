"use client";

import { Button } from "@/components/ui/button";

export default function ProductSubmitBar({
  mode,
  isSubmitting,
}: {
  mode: "create" | "edit";
  isSubmitting: boolean;
}) {
  return (
    <div className="flex justify-end border-t pt-4">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : mode === "edit"
            ? "Update Product"
            : "Create Product"}
      </Button>
    </div>
  );
}
