import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../notFound/NotFound";

const Post = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/news/${slug}`,
        );
        if (!res.ok) {
          setData(null);
          return;
        }
        const post = await res.json();
        setData(post);
      } catch (err) {
        console.error("Error fetching post:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return <div className="mt-40 text-center">Loading...</div>;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto mb-20 mt-40">
      <div className="flex flex-col">
        <Link
          to="/news"
          className="mb-2 flex max-w-min items-center gap-1 hover:text-foreground/90"
        >
          <ArrowLeftIcon />
          Back
        </Link>

        <p className="mt-2 text-gray-500">
          {data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
            : ""}
        </p>

        <h1 className="text-4xl font-semibold underline sm:text-5xl">
          {data.title}
        </h1>

        {data.image && (
          <img
            className="my-10 aspect-video w-full rounded-lg object-cover"
            src={data.image}
            alt={data.title}
          />
        )}
        {data.subtitle && (
          <h2 className="text-3xl font-semibold">{data.subtitle}</h2>
        )}
        <p className="mt-6 text-lg leading-relaxed">{data.content}</p>
      </div>
    </div>
  );
};

export default Post;
