import { desc, eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db";
import { news } from "../db/schema/news";
import { slugify } from "../utils/slugify";

// CREATE
export const createNews = async (req: Request, res: Response) => {
  const { title, subtitle, content, image, authorId } = req.body;

  if (!title || !content || !authorId || !image || !subtitle) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [inserted] = await db.insert(news).values({
      id: uuidv4(),
      title,
      subtitle,
      slug: slugify(title),
      content,
      image,
      authorId,
    });

    res.status(201).json({ message: "News created", id: inserted.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating news", error });
  }
};

// GET ALL
export const getAllNews = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const rows = await db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`COUNT(*)`.mapWith(Number) })
      .from(news);

    const total = totalResult[0]?.count ?? 0;

    return res.json({
      items: rows,
      total,
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching news", error: String(err) });
  }
};

// UPDATE
export const updateNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, subtitle, content, image } = req.body;

  try {
    await db
      .update(news)
      .set({
        title,
        subtitle,
        content,
        image,
        updatedAt: new Date(),
      })
      .where(eq(news.id, id));

    res.json({ message: "News updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating news", error });
  }
};

// DELETE
export const deleteNews = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.delete(news).where(eq(news.id, id));
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

// GET BY ID
export const getNewsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [row] = await db.select().from(news).where(eq(news.id, id));
    if (!row) return res.status(404).json({ message: "News not found" });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching news", error: String(err) });
  }
};

// GET BY SLUG
export const getNewsBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const [row] = await db.select().from(news).where(eq(news.slug, slug));
    if (!row) return res.status(404).json({ message: "News not found" });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching news", error: String(err) });
  }
};
