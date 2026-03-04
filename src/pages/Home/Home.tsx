import { useState } from "react";
import FeaturedCategories from "../../components/featured-categories/FeaturedCategories";
import TopPicks from "../../components/homeSearch/TopPicks";
import MainFooter from "../../components/mainFooter/MainFooter";
import PromoFooter from "../../components/Promofooter/PromoFooter";
import Header from "../../layout/Header/Header";
import Hero from "../../components/Hero/Hero";

const Home = () => {

  const [parentCategory, setParentCategory] = useState<string | null>(null);

  return (
   <>
     <Header 
       variant="overlay"
       onParentCategorySelect={setParentCategory}
     />

     <Hero category={parentCategory} />
     <FeaturedCategories/>
     <TopPicks/>
     <PromoFooter/>
     <MainFooter/>
   </>
  )
}

export default Home;