import { Blog } from ".velite";
import { DateFormatter } from "@/models/date-formatter";
import { Link } from "react-router-dom";

const Card = ({ post, index }: { post: Blog; index: number }) => {
  return (
    <Link
      key={index + "-" + post.slug}
      to={`/news/${post.slug}`}
      className="cursor-pointer hover:opacity-90"
    >
      <img
        className="aspect-video object-cover"
        src={post.image.src}
        alt={post.slug}
      />
      <p className="mt-2 text-foreground/50">
        {new DateFormatter(post.createdAt).formatWithFullDate()}
      </p>
      <h2 className="text-xl font-semibold underline">{post.title}</h2>
    </Link>
  );
};

export default Card;
