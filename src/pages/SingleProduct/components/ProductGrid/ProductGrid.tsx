import styles from "./ProductGrid.module.css"
import ProductCard from "../ProductCard/ProductCard";

interface Props{
 title:string
}

export default function ProductGrid({title}:Props){

 const dummy=[1,2,3,4]

 return(
  <div className={styles.section}>

   <div className={styles.header}>
    <h2>{title}</h2>
    <button>View All</button>
   </div>

   <div className={styles.grid}>
     {dummy.map((item)=>(
        <ProductCard key={item}/>
     ))}
   </div>

  </div>
 )
}