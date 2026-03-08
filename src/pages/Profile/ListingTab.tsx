import React from "react";
import { Link } from "react-router-dom";
import { Shirt } from "lucide-react"; 
import styles from "./Profile.module.css";
import type { Product } from "./types";

interface Props {
  products: Product[];
}

const ListingTab: React.FC<Props> = ({ products }) => {
  return (
    <div>
      <div className={styles.filterSection}>
        <select className={styles.filterSelect}>
          <option>Category: All</option>
          <option>Men's Clothing</option>
          <option>Women's Clothing</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Sort by: Newest</option>
          <option>Oldest</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <h3 className={styles.productCount}>
        {products.length} item{products.length !== 1 ? "s" : ""}
      </h3>

      <div className={styles.listingGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.itemCard}>
            <Link to={`/check-progress/${product._id}`}>
              <div className={styles.itemImageWrapper}>
                
                {/*  Conditional Rendering for Image vs Icon */}
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className={styles.itemImage} 
                  />
                ) : (
                  <div 
                    className={styles.itemImage} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      backgroundColor: "#f5f5f5" 
                    }}
                  >
                    <Shirt size={48} color="#ccc" strokeWidth={1.5} />
                  </div>
                )}
                
                <div className={styles.itemOverlay}>Check in progress</div>
              </div>
            </Link>
            <div className={styles.itemInfo}>
              <div className={styles.itemStats}>
                <span>{product.views} Views</span>
                <span>{product.favorites} Favs</span>
              </div>
              <button className={styles.bumpBtn}>Bump</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingTab;