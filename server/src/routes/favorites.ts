import { Router } from "express";
import { toggleFavorite } from "../controller/favorites.controller";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.post("/toggle", requireUser, toggleFavorite);

export default router;
