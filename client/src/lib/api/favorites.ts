import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const toggleFavorite = async (newsId: string) => {
  const res = await api.post("/api/favorites/toggle", { newsId });
  return res.data as { favorited: boolean; message: string };
};
