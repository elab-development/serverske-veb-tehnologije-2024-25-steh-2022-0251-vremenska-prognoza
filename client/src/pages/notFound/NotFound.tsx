import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto mb-20 mt-40">
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center sm:py-32">
        <h1 className="text-4xl font-bold sm:text-5xl">Not Found 404</h1>
        <p className="text-lg text-foreground/50">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="mt-4 h-12">
            Go back to Home
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
