import { and, eq } from "drizzle-orm";
import { Response } from "express";
import { db } from "../db/db";
import { favorites } from "../db/schema/favorites";
import { news } from "../db/schema/news";
import { AuthenticatedRequest } from "../middleware/requireAdmin";

// Toggle favorite (add/remove)
export const toggleFavorite = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const { newsId } = req.body;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  if (!newsId) return res.status(400).json({ message: "newsId is required" });

  try {
    const existing = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.newsId, newsId)));

    if (existing.length > 0) {
      await db
        .delete(favorites)
        .where(and(eq(favorites.userId, userId), eq(favorites.newsId, newsId)));
      return res.json({ message: "Removed from favorites", favorited: false });
    }

    await db.insert(favorites).values({ userId, newsId });
    return res.json({ message: "Added to favorites", favorited: true });
  } catch (err) {
    console.error("Error toggling favorite:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all favorites for user
export const getUserFavorites = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const favs = await db
      .select({
        id: news.id,
        title: news.title,
        subtitle: news.subtitle,
        content: news.content,
        image: news.image,
        authorId: news.authorId,
        slug: news.slug,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt,
      })
      .from(favorites)
      .leftJoin(news, eq(favorites.newsId, news.id))
      .where(eq(favorites.userId, userId));

    res.json(favs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
