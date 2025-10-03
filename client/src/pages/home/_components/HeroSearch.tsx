import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const HeroSearch = ({
  setLocation,
  inputRef,
}: {
  setLocation: (location: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-semibold">Stay Ahead of the Weather</h1>
        <p className="text-lg">
          Get real-time forecasts and alerts for your location.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLocation(inputRef.current?.value.toLowerCase() ?? "Belgrade");
        }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2"
      >
        <Input
          ref={inputRef}
          className="py-6"
          name="location"
          maxLength={50}
          placeholder="Enter your location"
        />
        <Button
          type="submit"
          className="flex items-center gap-1 py-6"
          size="lg"
        >
          <MagnifyingGlassIcon width={20} height={20} />
          Search
        </Button>
      </form>
    </div>
  );
};

export default HeroSearch;
