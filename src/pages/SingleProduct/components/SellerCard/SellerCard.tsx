import styles from "./SellerCard.module.css"
import type { Seller } from "../../../../types/SingleProduct";

interface Props{
 seller: Seller
}

export default function SellerCard({seller}:Props){
 return(
  <div className={styles.card}>

   <h4>@{seller.username}</h4>

   <p>{seller.location}</p>

   <p>Last seen {seller.lastSeen}</p>

   <button className={styles.follow}>
     Follow
   </button>

  </div>
 )
}