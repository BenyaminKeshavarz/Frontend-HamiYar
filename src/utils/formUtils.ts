// Helper function to calculate input size based on content
export function getInputSize(value: string | number | undefined, defaultSize?: number): number | null {
  const str = String(value || "");
  if (!str.length) return defaultSize ?? 13;
  return Math.max(str.length, 1);
}
