"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProductMediaUploader() {
  const { setValue, control } = useFormContext();
  const media = useWatch({ control, name: "media" }) || [];

  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Later replace with actual upload:
    const fakeUrl = URL.createObjectURL(file);

    const nextMedia = [...media, { url: fakeUrl }];
    setValue("media", nextMedia);

    setUploading(false);
  }

  function removeMedia(idx: number) {
    const next = media.filter((_, i) => i !== idx);
    setValue("media", next);
  }

  return (
    <div className="border p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Media</h2>

      <div className="grid grid-cols-3 gap-4">
        {media.map((m: any, idx: number) => (
          <div key={idx} className="relative">
            <img
              src={m.url}
              alt="media"
              className="rounded-lg border object-cover w-full h-32"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeMedia(idx)}
              className="absolute top-1 right-1"
            >
              ✕
            </Button>
          </div>
        ))}

        <label className="h-32 border rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-600">
            {uploading ? "Uploading…" : "Upload Media"}
          </span>
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
}
