import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TopPicks.module.css";
import ProductCard from "../productcard/ProductCard";
import { ChevronDown } from "../../components/icons";


type CategoryNode = {
  key: string;
  label: string;
  children?: CategoryNode[];
  options?: string[]; // leaf options
};

const CATEGORY_TREE: CategoryNode[] = [
  {
    key: "women",
    label: "Women",
    children: [
      { key: "women_clothing", label: "Clothing", options: ["Dresses", "Tops", "Jeans", "Jackets", "Abayas"] },
      { key: "women_shoes", label: "Shoes", options: ["Heels", "Sneakers", "Boots", "Flats", "Sandals", "Wedges"] },
      { key: "women_bags", label: "Bags", options: ["Handbags", "Crossbody", "Totes", "Clutches", "Backpacks", "Wallets"] },
      { key: "women_accessories", label: "Accessories", options: ["Jewelry", "Belts", "Scarves", "Sunglasses", "Watches", "Hats"] },
    ],
  },
  { key: "men", label: "Men" },
  { key: "kids", label: "Kids" },
  { key: "electronics", label: "Electronics" },
  { key: "sports", label: "Sports" },
  { key: "entertainment", label: "Entertainment" },
  { key: "faizan", label: "faizan Sports" },
];

const SIZE_OPTIONS = ["XXXS / 2", "XXX / 4", "XS / 6", "S / 8", "M / 10"];
const SORT_OPTIONS = ["Recommended", "Newest", "Price: Low to High", "Price: High to Low"];

type Drop = "category" | "price" | "size" | "sort" | null;

type Product = {
  id: string;
  image?: string;
  brand: string;
  meta: string;
  price: string;
  likes: string;
};

// Demo products (for UI only)
const ALL_DEMO_PRODUCTS: Product[] = Array.from({ length: 24 }).map((_, i) => {
  const brands = ["River Island", "Mango", "Topman", "Fashion House", "Zara", "Nike", "Adidas"];
  const b = brands[i % brands.length];
  return {
    id: String(i + 1),
    brand: b,
    meta: "M30 · Good",
    price: "$59.99",
    likes: "1.2k",
    image: undefined,
  };
});

function findNodeByKey(nodes: CategoryNode[], key: string): CategoryNode | null {
  for (const n of nodes) {
    if (n.key === key) return n;
    if (n.children) {
      const hit = findNodeByKey(n.children, key);
      if (hit) return hit;
    }
  }
  return null;
}

const PAGE_SIZE = 8;

const TopPicks = () => {
  const [open, setOpen] = useState<Drop>(null);

  // Category navigation (screen stack)
  const [catStack, setCatStack] = useState<string[]>([]);

  // Selected values (UI only)
  const [selectedPath, setSelectedPath] = useState<string>("All"); // for showing label on button
  const [selectedCatOptions, setSelectedCatOptions] = useState<Record<string, string[]>>({});
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<string>(SORT_OPTIONS[0]);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  // Pagination simulation
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(CATEGORY_TREE, catStack[catStack.length - 1]);
  }, [catStack]);

  // On first load: show first PAGE_SIZE products
  useEffect(() => {
    setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) {
        setOpen(null);
        setCatStack([]);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const toggleOpen = (d: Drop) => {
    setOpen((prev) => (prev === d ? null : d));
    if (d !== "category") setCatStack([]);
  };

  const goIntoCategory = (key: string) => setCatStack((s) => [...s, key]);
  const goBackCategory = () => setCatStack((s) => s.slice(0, -1));

  const showRoot = open === "category" && catStack.length === 0;
  const showCategoryScreen = open === "category" && catStack.length > 0;

  const toggleOption = (groupKey: string, option: string) => {
    setSelectedCatOptions((prev) => {
      const existing = prev[groupKey] ?? [];
      const has = existing.includes(option);
      const next = has ? existing.filter((x) => x !== option) : [...existing, option];
      return { ...prev, [groupKey]: next };
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((x) => x !== size) : [...prev, size]));
  };

  // --- UI demo “apply” behaviour (later backend will replace this) ---
  const applyCategorySelection = () => {

  console.log("Selected category stack:", catStack);
  console.log("LAST category (to send backend):", catStack[catStack.length - 1]);
    
    // create readable label from stack
    const labels = catStack
      .map((k) => findNodeByKey(CATEGORY_TREE, k)?.label)
      .filter(Boolean) as string[];

    const leaf = currentCatNode?.label ? [currentCatNode.label] : [];
    const path = labels.length ? labels.join(" / ") : "All";

    setSelectedPath(path);
    setOpen(null);
    setCatStack([]);

    // reset pagination and show page 1 again (UI demo)
    setPage(1);
    setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
  };

  const resetAll = () => {
    setSelectedPath("All");
    setSelectedCatOptions({});
    setSelectedSizes([]);
    setSortValue(SORT_OPTIONS[0]);
    setPriceFrom("");
    setPriceTo("");
    setOpen(null);
    setCatStack([]);
    setPage(1);
    setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
  };

  const hasMore = products.length < ALL_DEMO_PRODUCTS.length;

  const onSeeMore = () => {
    // UI demo pagination (later backend will do page=2 etc)
    const nextPage = page + 1;
    const nextCount = nextPage * PAGE_SIZE;
    setPage(nextPage);
    setProducts(ALL_DEMO_PRODUCTS.slice(0, nextCount));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Picks</h2>

        <button className={styles.resetBtn} type="button" onClick={resetAll}>
          Reset
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters} ref={panelRef}>
        <button
          className={`${styles.pill} ${selectedPath === "All" ? styles.pillActive : ""}`}
          type="button"
          onClick={() => {
            setSelectedPath("All");
            setPage(1);
            setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
          }}
        >
          All
        </button>

        {/* Category */}
        <div className={styles.dropWrap}>
          <button
            className={`${styles.pill} ${open === "category" ? styles.pillOpen : ""}`}
            type="button"
            onClick={() => toggleOpen("category")}
            title={selectedPath}
          >
            {selectedPath === "All" ? "Category" : selectedPath} <ChevronDown />
          </button>

          {open === "category" && (
            <div className={styles.dropdown}>
              {showRoot && (
                <div className={styles.menuList}>
                  <div className={styles.ddHeader}>Category</div>

                  {CATEGORY_TREE.map((c) => (
                    <button
                      key={c.key}
                      className={styles.menuItem}
                      type="button"
                      onClick={() => (c.children ? goIntoCategory(c.key) : applyCategorySelection())}
                    >
                      <span className={styles.menuLeft}>
                        <span className={styles.iconBox} aria-hidden="true">
                          □
                        </span>
                        <span className={styles.menuLabel}>{c.label}</span>
                      </span>

                      <span className={styles.menuRight} aria-hidden="true">
                        {c.children ? "›" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {showCategoryScreen && (
                <div className={styles.menuScreen}>
                  <div className={styles.menuTop}>
                    <button className={styles.backBtn} type="button" onClick={goBackCategory}>
                      ‹
                    </button>

                    <div className={styles.menuTitle}>{currentCatNode?.label ?? "Category"}</div>

                    <button className={styles.applyBtn} type="button" onClick={applyCategorySelection}>
                      Apply
                    </button>
                  </div>

                  {/* if this level has children */}
                  {currentCatNode?.children?.length ? (
                    <div className={styles.menuList}>
                      {currentCatNode.children.map((child) => (
                        <button
                          key={child.key}
                          className={styles.menuItem}
                          type="button"
                          onClick={() => goIntoCategory(child.key)}
                        >
                          <span className={styles.menuLeft}>
                            <span className={styles.iconBox} aria-hidden="true">
                              □
                            </span>
                            <span className={styles.menuLabel}>{child.label}</span>
                          </span>
                          <span className={styles.menuRight} aria-hidden="true">
                            ›
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    // leaf options (checkbox list)
                    <div className={styles.checkList}>
                      <div className={styles.ddSubHeader}>Choose options</div>

                      {(currentCatNode?.options ?? []).map((opt) => {
                        const groupKey = currentCatNode?.key ?? "unknown";
                        const checked = (selectedCatOptions[groupKey] ?? []).includes(opt);

                        return (
                          <label key={opt} className={styles.checkRow}>
                            <input
                              className={styles.checkInput}
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleOption(groupKey, opt)}
                            />
                            <span className={styles.checkText}>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price */}
        <div className={styles.dropWrap}>
          <button
            className={`${styles.pill} ${open === "price" ? styles.pillOpen : ""}`}
            type="button"
            onClick={() => toggleOpen("price")}
          >
            Price <ChevronDown />
          </button>

          {open === "price" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Price Range</div>

              <div className={styles.priceBox}>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>From</label>
                  <input
                    className={styles.priceInput}
                    placeholder="0"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </div>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>To</label>
                  <input
                    className={styles.priceInput}
                    placeholder="999"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.ddFooter}>
                <button className={styles.smallBtn} type="button" onClick={() => setOpen(null)}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Size */}
        <div className={styles.dropWrap}>
          <button
            className={`${styles.pill} ${open === "size" ? styles.pillOpen : ""}`}
            type="button"
            onClick={() => toggleOpen("size")}
          >
            Size <ChevronDown />
          </button>

          {open === "size" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Sizes</div>

              <div className={styles.sizeList}>
                {SIZE_OPTIONS.map((s) => {
                  const checked = selectedSizes.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      className={styles.sizeRow}
                      onClick={() => toggleSize(s)}
                    >
                      <span className={styles.sizeText}>{s}</span>
                      <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                        {checked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.ddFooter}>
                <button className={styles.smallBtn} type="button" onClick={() => setOpen(null)}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className={styles.dropWrap}>
          <button
            className={`${styles.pill} ${open === "sort" ? styles.pillOpen : ""}`}
            type="button"
            onClick={() => toggleOpen("sort")}
          >
            Sort By <ChevronDown />
          </button>

          {open === "sort" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Sort</div>

              <div className={styles.menuList}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={styles.menuItem}
                    onClick={() => {
                      setSortValue(opt);
                      setOpen(null);
                    }}
                  >
                    <span className={styles.menuLeft}>
                      <span className={styles.menuLabel}>{opt}</span>
                    </span>
                    <span className={styles.menuRight} aria-hidden="true">
                      {sortValue === opt ? "✓" : ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            brand={p.brand}
            meta={p.meta}
            price={p.price}
            likes={p.likes}
          />
        ))}
      </div>

      {/* See more */}
      <div className={styles.footer}>
        <button className={styles.seeMore} type="button" onClick={onSeeMore} disabled={!hasMore}>
          {hasMore ? "See More" : "No More Products"}
        </button>
      </div>
    </section>
  );
};

export default TopPicks;
