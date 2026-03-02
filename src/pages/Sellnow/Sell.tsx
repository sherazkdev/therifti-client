import MainFooter from "../../components/mainFooter/MainFooter";
import PromoFooter from "../../components/Promofooter/PromoFooter";
import Header from "../../layout/Header/Header";
import SellItem from "../../components/SellNow/SellItem";

const Sell = () => {
  return (
    <>
   
    <Header showHero={false}/>
    <SellItem/>
    <PromoFooter/>
    <MainFooter/>
    </>
  )
}

export default Sell