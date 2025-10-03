import axios from "axios";
import { News } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const toggleFavorite = async (newsId: string) => {
  const res = await api.post("/api/favorites/toggle", { newsId });
  return res.data as { favorited: boolean; message: string };
};

export const getUserFavorites = async () => {
  const res = await api.get("/api/favorites");
  return res.data as News[];
};
