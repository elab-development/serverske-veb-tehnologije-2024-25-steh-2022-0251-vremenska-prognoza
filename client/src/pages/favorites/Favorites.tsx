import Card from "@/components/FeaturedNews/Card";
import { getUserFavorites } from "@/lib/api/favorites";
import { News } from "@/lib/types";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-40 h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
    );
  }

  return (
    <div className="container mx-auto mb-20 mt-40">
      <div className="flex w-full flex-col gap-2 border-b pb-4">
        <h1 className="text-5xl font-semibold">Your Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {favorites.map((post, index) => (
            <Card
              key={post.id}
              index={index}
              post={post}
              onToggleFavorite={(newsId, favorited) => {
                if (!favorited) {
                  setFavorites((prev) => prev.filter((f) => f.id !== newsId));
                }
              }}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-lg text-muted-foreground">
          You haven't added any favorites yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
