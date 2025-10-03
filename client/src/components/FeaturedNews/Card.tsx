import { useAuthContext } from "@/hooks/useAuth";
import { getUserFavorites, toggleFavorite } from "@/lib/api/favorites";
import { News } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  post: News;
  index: number;
  onToggleFavorite?: (newsId: string, favorited: boolean) => void;
}

const Card = ({ post, index, onToggleFavorite }: CardProps) => {
  const auth = useAuthContext();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.user?.role !== "user") return;
      try {
        const favs = await getUserFavorites();
        setFavorited(favs.some((f) => f.id === post.id));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };
    fetchFavorites();
  }, [post.id, auth.user?.role]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (auth.user?.role !== "user") return;
    try {
      const res = await toggleFavorite(post.id);
      setFavorited(res.favorited);
      onToggleFavorite?.(post.id, res.favorited);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <Link
      key={index + "-" + post.slug}
      to={`/news/${post.slug}`}
      className="cursor-pointer hover:opacity-90"
    >
      <div className="relative">
        {auth.user?.role === "user" && (
          <button
            onClick={handleFavorite}
            className={cn(
              "absolute right-0 flex items-center justify-center rounded-bl-md rounded-tr bg-black/15 p-3 backdrop-blur-xl transition-colors duration-150",
              favorited ? "bg-yellow-400/30" : "text-white",
            )}
          >
            {!favorited ? (
              <StarIcon
                className={cn(
                  "h-[22px] w-[22px]",
                  favorited ? "text-yellow-400" : "text-white",
                )}
              />
            ) : (
              <StarFilledIcon className="h-[22px] w-[22px] text-yellow-400 transition-colors duration-200" />
            )}
          </button>
        )}
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
