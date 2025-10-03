import slugifyLib from "slugify";

export const slugify = (title: string) => {
  const base = slugifyLib(title, { lower: true, strict: true });
  const random = Math.random().toString(36).slice(2, 7);
  return `${base}-${random}`;
};
