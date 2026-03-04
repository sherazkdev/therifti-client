import styles from "./ProductPage.module.css"
import ProductGallery from "./components/ProductGallery/ProductGallery"
import ProductInfo from "./components/ProductInfo/ProductInfo"
import SellerCard from "./components/SellerCard/SellerCard"
import ProductGrid from "./components/ProductGrid/ProductGrid"
import type { Product } from "../../types/SingleProduct"

const dummyProduct: Product = {
  id: "1",
  title: "The ReWool Black Nike Hoodie",
  brand: "Nike",
  price: 20,
  oldPrice: 21,
  condition: "New with tags",
  size: "One Size",
  color: "Black",
  images: [
    "/images/p1.jpg",
    "/images/p2.jpg",
    "/images/p3.jpg",
    "/images/p4.jpg"
  ],
  seller: {
    id: "s1",
    username: "fashion store",
    location: "Manchester, UK",
    lastSeen: "8 hours ago"
  }
}

export default function ProductPage() {
  return (
    <div className={styles.container}>

      <div className={styles.topSection}>

        <ProductGallery images={dummyProduct.images} />

        <div className={styles.infoSection}>
          <ProductInfo product={dummyProduct} />
          <SellerCard seller={dummyProduct.seller} />
        </div>

      </div>

      <ProductGrid title="Member's Items" />
      <ProductGrid title="Recommended Products" />

    </div>
  )
}