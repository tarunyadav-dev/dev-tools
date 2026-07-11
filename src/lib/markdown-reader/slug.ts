/**
 * slug.ts
 *
 * Pure, standalone slug generation. No dependency on the rest of the
 * pipeline -- usable on its own, e.g. to compute a document's route slug
 * from its H1 title.
 *
 * "React Flow" -> "react-flow"
 */

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // strip punctuation
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates a slug for a heading while guaranteeing uniqueness within a
 * single document, the same way most static-site generators disambiguate
 * repeated heading text ("installation", "installation-2", ...).
 */
export function makeSlugger() {
  const seen = new Map<string, number>();
  return function nextSlug(title: string): string {
    const base = slugify(title) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}
