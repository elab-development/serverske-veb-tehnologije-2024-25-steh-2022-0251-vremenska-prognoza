import Card from "@/components/FeaturedNews/Card";
import type { News } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import NewsPagination from "./_components/NewsPagination";

const POSTS_PER_PAGE = 2;

const News = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const url = useLocation();
  const pageNumber = Number(new URLSearchParams(url.search).get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/news?page=${pageNumber}&limit=${POSTS_PER_PAGE}`,
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setTotalPages(Math.ceil(data.length / POSTS_PER_PAGE));
          setNews(data);
        } else if (data.items) {
          setNews(data.items);
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE));
        } else {
          setNews([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [pageNumber]);

  if (loading) {
    return (
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
    );
  }

  if (!news || news.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto mb-20 mt-40">
      <div className="flex w-full flex-col gap-2 border-b pb-4">
        <h1 className="text-5xl font-semibold">Latest Weather News</h1>
        <p className="text-lg">
          Stay updated with the most recent weather stories and updates.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        {news.map((post, index) => (
          <Card index={index} key={post.id} post={post} />
        ))}
      </div>

      <NewsPagination pageNumber={pageNumber} totalPages={totalPages} />
    </div>
  );
};

export default News;
