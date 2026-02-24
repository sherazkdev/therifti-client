import FeaturedCategories from "../../components/featured-categories/FeaturedCategories";
import TopPicks from "../../components/homeSearch/TopPicks";
import MainFooter from "../../components/mainFooter/MainFooter";
import PromoFooter from "../../components/Promofooter/PromoFooter";
import Header from "../../layout/Header/Header"





const Home = () => {
  return (
   <>
   <Header/>
   <FeaturedCategories/>
   <TopPicks/>
   {/* <ProductCard brand="faizan" price="$59.99" />     this productcards need the props of  */}
   <PromoFooter/>
   <MainFooter/>

   </>
  )
}

export default Home;