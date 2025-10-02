import { defineCollection, defineConfig, s } from "velite";

const blogSchema = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    createdAt: s.isodate(),
    image: s.image(),
    mdx: s.mdx(),
    slug: s.string(),
  }),
});

export default defineConfig({
  collections: {
    blog: blogSchema,
  },
});
