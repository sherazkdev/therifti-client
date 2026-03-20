import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Shirt } from "lucide-react";
import styles from "./ListingTab.module.css";
import { categories } from "../../data/categories";
import { useListingFilters } from "../../hooks/server/ProfileFilter/useListingFilters";
import type { CategoryDocument } from "../../types/api/category.types";
import type { Product } from "./types";
import type { ProductSort } from "../../types/api/product.types";
import type { Drop } from "../../types/components/listingDrop";  
import { SORT_OPTIONS } from "../../data/sort";

interface Props {
  products: Product[];
}

const ListingTab: React.FC<Props> = ({ products }) => {
  const { buildPayload, handleCategoryChange, handleSortChange } =  useListingFilters();

  const [open, setOpen] = useState<Drop>(null);
  const [catStack, setCatStack] = useState<string[]>([]);     //this worked as a history stack to navigate categories, pushing on goNext and popping on goBack
  const [selectedPath, setSelectedPath] = useState("Category");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<ProductSort>("RELEVANCE");

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("INITIAL PAYLOAD", buildPayload());
  }, []);

  //category tree me se ek specific category dhoondhna (by id)
  const findNode = (nodes: CategoryDocument[], key: string): CategoryDocument | null => {
    for (const n of nodes) {
      if (n._id === key) return n;
      if (n.children) {
        const hit = findNode(n.children, key);
        if (hit) return hit;
      }
    }
    return null;
  };
 
  // show on what level u are in category by using catStack
  const currentNode = useMemo(() => {
    if (!catStack.length) return null;
    return findNode(categories, catStack[catStack.length - 1]);
  }, [catStack]);

  const toggleOpen = (d: Drop) => {
    setOpen((prev) => (prev === d ? null : d));
    if (d !== "category") setCatStack([]);
  };

  const goNext = (id: string) => setCatStack((s) => [...s, id]);
  const goBack = () => setCatStack((s) => s.slice(0, -1));

  // final selection confirm + payload send
  const applyCategory = (explicitId?: string) => {
  const lastKey =
    explicitId ?? (catStack.length ? catStack[catStack.length - 1] : null);

  const node = lastKey ? findNode(categories, lastKey) : null; //  only once call findNode

  setSelectedId(lastKey);
  setSelectedPath(node?.title || "Category");

  setOpen(null);
  setCatStack([]);

  handleCategoryChange(lastKey || "ALL");
};

  const handleSort = (value: ProductSort) => {
    setSortValue(value);
    setOpen(null);
    handleSortChange(value);
  };

  return (
    <div>
      {/* FILTERS */}
      <div className={styles.filters} ref={panelRef}>
        
        {/* ALL */}
        <div
          className={`${styles.pill} ${!selectedId ? styles.pillActive : ""}`}
          onClick={() => applyCategory(undefined)}
        >
          All
        </div>

        {/* CATEGORY */}
        <div className={styles.dropWrap}>
          <div
            className={`${styles.pill} ${
              open === "category" ? styles.pillOpen : ""
            }`}
            onClick={() => toggleOpen("category")}
          >
            {selectedPath}
          </div>

          {open === "category" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Category</div>

              {catStack.length > 0 && (
                <div className={styles.menuTop}>
                  <button onClick={goBack} className={styles.backBtn}>←</button>
                  <div className={styles.menuTitle}>Select</div>
                  <button className={styles.applyBtn} onClick={() => applyCategory()}>
                    Apply
                  </button>
                </div>
              )}

              <div className={styles.menuList}>
                {(currentNode?.children || categories).map((cat) => (
                  <button
                    key={cat._id}
                    className={styles.menuItem}
                    onClick={() => {
                      if (cat.children?.length) goNext(cat._id);
                      else setSelectedId(cat._id);
                    }}
                  >
                    <span className={styles.menuLabel}>{cat.title}</span>

                    {cat.children?.length ? (
                      <span className={styles.menuRight}>›</span>
                    ) : (
                      <span className={styles.checkbox}>
                        {selectedId === cat._id && "✔"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SORT */}
        <div className={styles.dropWrap}>
          <div
            className={`${styles.pill} ${
              open === "sort" ? styles.pillOpen : ""
            }`}
            onClick={() => toggleOpen("sort")}
          >
            Sort By
          </div>

          {open === "sort" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Sort</div>

              <div className={styles.menuList}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    className={styles.menuItem}
                    onClick={() => handleSort(s.value as ProductSort)}
                  >
                    {s.label}

                    <span className={styles.checkbox}>
                      {sortValue === s.value && "✔"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT COUNT */}
      <h3 className={styles.productCount}>
        {products.length} item{products.length !== 1 ? "s" : ""}
      </h3>

      {/* PRODUCT GRID */}
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