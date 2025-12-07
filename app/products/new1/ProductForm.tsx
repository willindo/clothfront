// Unified refactor for product form files
// What this bundle contains (apply to /home/badsha/dev/cloth/clothfront/app/products/new):
//  - ProductForm.tsx                (updated: uses zProductFormSchema + formToApi)
//  - product.form.zod.ts            (form schema — kept, minor clarity)
//  - product.form.utils.ts          (kept, clarified defaults)
//  - product.form.transform.ts      (NEW: converts Form -> API payload and validates)
//  - README block at top explains keep/delete guidance

// ------------------------------
// KEEP / DELETE GUIDANCE
// ------------------------------
// Keep: product.form.zod.ts, product.form.utils.ts (they are form-facing)
// Add/Keep: ProductForm.tsx (replace current file with this updated version)
// Add: product.form.transform.ts (new) — required for converting form output to API input
// Delete: any duplicated or older copies of these files found in other chats/repos. Keep the canonical files in the path above.

// ------------------------------
// FILE: ProductForm.tsx
// Path: app/products/new/ProductForm.tsx
// ------------------------------

// ------------------------------
// FILE: product.form.transform.ts

// ------------------------------
// FILE: product.form.zod.ts

// ------------------------------
// FILE: product.form.utils.ts
