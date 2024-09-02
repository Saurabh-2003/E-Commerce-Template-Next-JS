import Blog from "./Blog";
import Categories from "./categories";
import Hero from "./Hero";
import { LadduSweetsCarousel } from "./laddu-sweets-carousel";
import SpecialOffer from "./special-offer";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-20 h-full overflow-hidden">
      <Hero />
      <SpecialOffer />
      <Categories />
      <LadduSweetsCarousel />
      <Blog />
    </div>
  );
};

export default Home;
