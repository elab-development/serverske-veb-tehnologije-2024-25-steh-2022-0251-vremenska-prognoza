import { and, eq } from "drizzle-orm";
import { Response } from "express";
import { db } from "../db/db";
import { favorites } from "../db/schema/favorites";
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
