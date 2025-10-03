import { Button } from "@/components/ui/button";
import { MdiEllipsisHorizontal } from "@/components/ui/mdi-ellipsis-horizontal";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  pageNumber: number;
  totalPages: number;
};

const NewsPagination = ({ pageNumber, totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || "";
  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const page = parseInt(pageParam);
    if (page < 1 || page > totalPages || isNaN(page)) {
      handlePageChange(1);
    }
  }, [pageParam, totalPages]);

  return (
    <div className="mt-20 flex items-center justify-center gap-2">
      <Button
        className="flex items-center"
        variant="ghost"
        onClick={() => pageNumber > 1 && handlePageChange(pageNumber - 1)}
        aria-label="Previous"
        disabled={pageNumber <= 1}
      >
        <ChevronLeftIcon className="mt-[1px]" /> Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          className={cn(
            i + 1 === pageNumber ? "border border-input" : undefined,
          )}
          variant="ghost"
          onClick={() => handlePageChange(i + 1)}
          aria-label={`Page ${i + 1}`}
        >
          {i + 1}
        </Button>
      ))}
      <MdiEllipsisHorizontal />
      <Button
        className="flex items-center"
        variant="ghost"
        onClick={() =>
          pageNumber < totalPages && handlePageChange(pageNumber + 1)
        }
        aria-label="Next"
        disabled={pageNumber >= totalPages}
      >
        Next <ChevronRightIcon className="mt-[1px]" />
      </Button>
    </div>
  );
};

export default NewsPagination;
