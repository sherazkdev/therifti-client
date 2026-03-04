import styles from "./ProductInfo.module.css"
import type { Product } from "../../../../types/SingleProduct"
import { ShieldCheck, Truck } from "lucide-react"

interface Props {
  product: Product
}

export default function ProductInfo({ product }: Props) {

  return (
    <div className={styles.info}>

      <h1>{product.title}</h1>
      <p className={styles.brand}>{product.brand}</p>

      <div className={styles.price}>
        <span className={styles.current}>£{product.price}</span>
        {product.oldPrice && (
          <span className={styles.old}>£{product.oldPrice}</span>
        )}
      </div>

      <div className={styles.meta}>
        <p><b>Size:</b> {product.size}</p>
        <p><b>Condition:</b> {product.condition}</p>
        <p><b>Color:</b> {product.color}</p>
      </div>

      <div className={styles.shipping}>
        <Truck size={18} />
        <span>Free postage</span>
      </div>

      <div className={styles.buttons}>
        <button className={styles.buy}>Buy Now</button>
        <button className={styles.offer}>Make Offer</button>
        <button className={styles.ask}>Ask Seller</button>
      </div>

      <div className={styles.protection}>
        <ShieldCheck size={18}/>
        Buyer Protection Included
      </div>

    </div>
  )
}