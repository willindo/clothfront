export function cartesian(
  input: Record<string, string[]>,
): Record<string, string>[] {
  const entries = Object.entries(input).filter(
    ([, values]) => values.length > 0,
  );

  if (entries.length === 0) return [];

  return entries.reduce<Record<string, string>[]>(
    (acc, [key, values]) =>
      acc.flatMap((item) => values.map((v) => ({ ...item, [key]: v }))),
    [{}],
  );
}
