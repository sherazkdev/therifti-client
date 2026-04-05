import { useState } from "react";
import FeaturedCategories from "../../components/featured-categories/FeaturedCategories";
import TopPicks from "../../components/homeSearch/TopPicks";
import PromoFooter from "../../components/Promofooter/PromoFooter";
import Hero from "../../components/Hero/Hero";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const Home = () => {

  const [parentCategory, setParentCategory] = useState<string | null>(null);

  return (
   <>
      <Hero category={parentCategory} />
      <GoogleAuth />
      <FeaturedCategories/>
      <TopPicks/>
      <PromoFooter/>
   
   </>
  )
}

export default Home;