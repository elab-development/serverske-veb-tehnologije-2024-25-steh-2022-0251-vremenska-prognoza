import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { news } from "./news";
import { user } from "./users";

export const favorites = mysqlTable("favorites", {
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  newsId: varchar("news_id", { length: 36 })
    .notNull()
    .references(() => news.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
