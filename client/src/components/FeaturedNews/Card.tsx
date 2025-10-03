import { News } from "@/lib/types";
import { Link } from "react-router-dom";

interface CardProps {
  post: News;
  index: number;
}

const Card = ({ post, index }: CardProps) => {
  return (
    <Link
      key={index + "-" + post.slug}
      to={`/news/${post.slug}`}
      className="cursor-pointer hover:opacity-90"
    >
      <div className="relative">
        <img
          className="aspect-video rounded-md object-cover"
          src={post.image}
          alt={post.slug}
        />
      </div>
      <p className="my-2 text-foreground/50">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })
          : ""}
      </p>
      <h2 className="text-xl font-semibold underline">{post.title}</h2>
    </Link>
  );
};

export default Card;
