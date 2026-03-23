import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shirt } from "lucide-react";
import styles from "./ListingTab.module.css";
import type { Product } from "./types";
import { categories } from "../../data/categories";
import { useListingFilters } from "../../hooks/server/ProfileFilter/useListingFilters";
import type { CategoryDocument } from "../../types/api/category.types";

interface Props {
  products: Product[];
}

const ListingTab: React.FC<Props> = ({ products }) => {
  const { buildPayload, handleCategoryChange, handleSortChange } =
    useListingFilters();

  const [openCategory, setOpenCategory] = useState(false);
  const [stack, setStack] = useState<string[]>([]);
  const [activeList, setActiveList] =
    useState<CategoryDocument[]>(categories);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //  INITIAL PAYLOAD
  useEffect(() => {
    console.log("INITIAL PAYLOAD", buildPayload());
  }, []);

  //  go deeper
  const goNext = (cat: CategoryDocument) => {
    setStack((prev) => [...prev, cat._id]);
    setActiveList(cat.children || []);
  };

  //  go back
  const goBack = () => {
    const newStack = stack.slice(0, -1);
    setStack(newStack);

    let list = categories;
    for (const id of newStack) {
      const found = list.find((c) => c._id === id);
      list = found?.children || [];
    }

    setActiveList(list);
  };

  // 👉 APPLY CATEGORY
  const applyCategory = () => {
    handleCategoryChange(selectedId || "ALL");
    setOpenCategory(false);
  };

  return (
    <div>
      {/* FILTER BAR */}
      <div className={styles.filterSection}>
        
        {/* CATEGORY BUTTON */}
        <button
          className={styles.filterBtn}
          onClick={() => setOpenCategory((p) => !p)}
        >
          Category
        </button>

        {/* SORT */}
        <select
          className={styles.filterSelect}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort: Default</option>
          <option value="NEWEST_FIRST">Newest</option>
          <option value="PRICE_LOW_TO_HIGH">Price Low → High</option>
          <option value="PRICE_HIGH_TO_LOW">Price High → Low</option>
        </select>
      </div>

      {/* CATEGORY DROPDOWN */}
      {openCategory && (
        <div className={styles.dropdown}>
          
          {/* ALL */}
          <button
            className={styles.allBtn}
            onClick={() => {
              setSelectedId(null);
              handleCategoryChange("ALL");
              setOpenCategory(false);
            }}
          >
            All
          </button>

          {/* BACK */}
          {stack.length > 0 && (
            <button className={styles.backBtn} onClick={goBack}>
              ← Back
            </button>
          )}

          {/* LIST */}
          <div className={styles.list}>
            {activeList.map((cat) => (
              <button
                key={cat._id}
                className={styles.item}
                onClick={() => {
                  if (cat.children?.length) {
                    goNext(cat);
                  } else {
                    setSelectedId(cat._id);
                  }
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* APPLY */}
          <button
            className={styles.applyBtn}
            onClick={applyCategory}
            disabled={!selectedId}
          >
            Apply
          </button>
        </div>
      )}

      {/* COUNT */}
      <h3 className={styles.productCount}>
        {products.length} item{products.length !== 1 ? "s" : ""}
      </h3>

      {/* GRID */}
      <div className={styles.listingGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.itemCard}>
            <Link to={`/check-progress/${product._id}`}>
              <div className={styles.itemImageWrapper}>
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className={styles.itemImage}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <Shirt size={48} />
                  </div>
                )}
                <div className={styles.itemOverlay}>
                  Check in progress
                </div>
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