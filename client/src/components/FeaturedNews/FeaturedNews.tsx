import { Blog } from ".velite";
import { getPosts, sorters } from "@/lib/get-content";
import { useEffect, useState } from "react";
import Card from "./Card";
type NewsState = Blog[] | null;

const FeaturedNews = () => {
  const [news, setNews] = useState<NewsState>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const newsData: Blog[] = await getPosts(
        undefined,
        sorters.createdAtDesc,
        2,
        0,
      );
      setNews(newsData);
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-20">
      <div className="flex w-full flex-col gap-2 border-b pb-4">
        <h1 className="text-5xl font-semibold">Featured news</h1>
        <p className="text-lg">
          Stay updated with the most recent weather stories and updates.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        {news?.map((post, index) => (
          <Card key={post.slug} index={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedNews;
