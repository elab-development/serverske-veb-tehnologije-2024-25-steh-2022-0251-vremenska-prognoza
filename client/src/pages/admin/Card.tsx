import { Checkbox } from "@/components/ui/checkbox";
import { News } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CardProps {
  post: News;
  isSelected: boolean;
  onSelect: () => void;
}

const Card = ({ post, isSelected, onSelect }: CardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer rounded-lg border p-4 transition-all hover:bg-primary/5 hover:shadow-sm",
        isSelected && "border-foreground/10 bg-primary/5",
      )}
    >
      <div className="flex w-full items-center gap-4">
        <Checkbox
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          className="-z-10 flex items-center justify-center border-input"
        />

        <img
          src={post.image}
          alt={post.title}
          className="h-24 w-24 flex-shrink-0 rounded object-cover"
        />

        <div className="flex w-full items-center justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                {post.content && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.content.substring(0, 80)}...
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
