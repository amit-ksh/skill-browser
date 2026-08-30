export function cn(...inputs: unknown[]): string {
  return inputs
    .flat()
    .filter(
      (x): x is string | number =>
        typeof x === "string" || typeof x === "number",
    )
    .join(" ")
    .trim();
}
