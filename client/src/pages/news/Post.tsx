import { MDXContent } from "@/components/mdx-content";
import { getPostBySlug } from "@/lib/get-content";
import { DateFormatter } from "@/models/date-formatter";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../notFound/NotFound";

const Post = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostBySlug(slug || "");
      setData(data);
    };
    fetchData();
  }, []);

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
          {new DateFormatter(new Date(data.createdAt)).formatWithFullDate()}
        </p>
        <h1 className="text-4xl font-semibold underline sm:text-5xl">
          {data?.title}
        </h1>
        <img
          className="my-10 aspect-video object-cover"
          src={data.image?.src}
          alt={slug}
        />
        {data.mdx && <MDXContent code={data.mdx} />}
      </div>
    </div>
  );
};

export default Post;
