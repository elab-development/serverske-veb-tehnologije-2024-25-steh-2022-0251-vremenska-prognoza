import { Router } from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "../controller/news.controller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", getAllNews);

router.post("/", requireAdmin, createNews);
router.put("/:id", requireAdmin, updateNews);
router.delete("/:id", requireAdmin, deleteNews);

export default router;
