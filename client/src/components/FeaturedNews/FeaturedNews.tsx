import { News } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const FeaturedNews: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get("/api/news?page=1&limit=2");
        setNews(data.items || []);
      } catch (err) {
        console.error("Failed to fetch featured news:", err);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-20">
      <div className="flex w-full flex-col gap-2 border-b pb-4">
        <h1 className="text-5xl font-semibold">Featured News</h1>
        <p className="text-lg">
          Stay updated with the most recent weather stories and updates.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        {news.map((post, index) => (
          <Card index={index} key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedNews;
