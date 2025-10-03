import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { News } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Pencil1Icon } from "@radix-ui/react-icons";

interface CardProps {
  post: News;
  isSelected: boolean;
  onSelect: () => void;
  onEdit?: (post: News) => void;
}

const Card = ({ post, isSelected, onSelect, onEdit }: CardProps) => {
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
          {onEdit && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(post);
              }}
              className="h-8 w-8 rounded bg-secondary p-1 text-secondary-foreground hover:text-white"
              title="Edit post"
            >
              <Pencil1Icon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
