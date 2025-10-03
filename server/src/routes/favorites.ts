import { Router } from "express";
import {
  getUserFavorites,
  toggleFavorite,
} from "../controller/favorites.controller";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.post("/toggle", requireUser, toggleFavorite);
router.get("/", requireUser, getUserFavorites);

export default router;
