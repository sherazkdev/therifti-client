import styles from "./ProductCard.module.css"
import { Heart } from "lucide-react"

export default function ProductCard(){

 return(
  <div className={styles.card}>

   <div className={styles.image}>
     <img src="/images/sample.jpg"/>
     <Heart className={styles.like}/>
   </div>

   <h4>River Island</h4>
   <p>M30 · Good</p>

   <span className={styles.price}>
     $59.99
   </span>

  </div>
 )
}