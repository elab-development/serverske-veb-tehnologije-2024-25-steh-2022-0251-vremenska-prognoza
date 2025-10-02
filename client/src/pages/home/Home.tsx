import FeaturedNews from "@/components/FeaturedNews/FeaturedNews";
import Hero from "./_components/Hero";

const Home = () => {
  return (
    <div className="container mx-auto mb-20 mt-40">
      <Hero />
      <FeaturedNews />
    </div>
  );
};

export default Home;
