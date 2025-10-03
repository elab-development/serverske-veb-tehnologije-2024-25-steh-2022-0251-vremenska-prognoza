import FeaturedNews from "@/components/FeaturedNews/FeaturedNews";
import { useAuthContext } from "@/hooks/useAuth";
import Hero from "./_components/Hero";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto mb-20 mt-40">
      <Hero />
      {user && <FeaturedNews />}
    </div>
  );
};

export default Home;
