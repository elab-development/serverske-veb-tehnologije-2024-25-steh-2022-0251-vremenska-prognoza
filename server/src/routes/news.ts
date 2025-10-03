import { Router } from "express";
import { createNews, getAllNews } from "../controller/news.controller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", getAllNews);

router.post("/", requireAdmin, createNews);

export default router;
