import { Router } from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
} from "../controllers/news.controller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);
router.get("/:id", getNewsById);

router.post("/", requireAdmin, createNews);
router.put("/:id", requireAdmin, updateNews);
router.delete("/:id", requireAdmin, deleteNews);

export default router;
