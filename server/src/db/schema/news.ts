import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const news = mysqlTable("news", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  image: text("image").notNull(),
  content: text("content").notNull(),
  authorId: varchar("author_id", { length: 36 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
