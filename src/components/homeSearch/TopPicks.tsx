

// TopPicks.tsx (backend-ready + payload simplified + state lag fixed)

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TopPicks.module.css";
import ProductCard from "../productcard/ProductCard";
import { ChevronDown } from "../../components/icons";
import { Shirt } from "lucide-react";
import { ChevronLeft } from 'lucide-react';


/* ---------------- TYPES ---------------- */
export type CategoryNode = {
  key: string;
  label: string;
  iconUrl?: string; 
  children?: CategoryNode[];
  options?: string[]; 
};

type Drop = "category" | "price" | "size" | "sort" | null;

export type Product = {
  id: string;
  image?: string;
  brand: string;
  meta: string;
  price: string;
  likes: string;
};

/* ---------------- DEFAULT FALLBACK DATA (UI demo) ---------------- */
const CATEGORY_TREE_FALLBACK: CategoryNode[] = [
  {
    key: "women",
    label: "Women",
    children: [
      {
        key: "women_clothing",
        label: "Clothing",
        options: ["Dresses", "Tops", "Jeans", "Jackets", "Abayas"],
      },
      {
        key: "women_shoes",
        label: "Shoes",
        options: ["Heels", "Sneakers", "Boots", "Flats", "Sandals", "Wedges"],
      },
      {
        key: "women_bags",
        label: "Bags",
        options: ["Handbags", "Crossbody", "Totes", "Clutches", "Backpacks", "Wallets"],
      },
      {
        key: "women_accessories",
        label: "Accessories",
        options: ["Jewelry", "Belts", "Scarves", "Sunglasses", "Watches", "Hats"],
      },
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

/* ---------------- HELPERS ---------------- */
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

function buildCategoryLabel(tree: CategoryNode[], stack: string[]) {
  const labels = stack
    .map((k) => findNodeByKey(tree, k)?.label)
    .filter(Boolean) as string[];
  return labels.length ? labels.join(" / ") : "All";
}

function toNumberOrUndefined(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/* ---------------- API (PLACEHOLDERS) ---------------- */
async function apiFetchCategories(): Promise<CategoryNode[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

type FetchProductsResponse =
  | { items: Product[]; total: number }
  | { items: Product[]; hasMore: boolean };

type ProductFiltersPayload = {
  page: number;
  pageSize: number;
  sort: string;
  categoryKey?: string; 
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
};

async function apiFetchProducts(payload: ProductFiltersPayload): Promise<FetchProductsResponse> {
  const params = new URLSearchParams();

  params.set("page", String(payload.page));
  params.set("pageSize", String(payload.pageSize));
  params.set("sort", payload.sort);

  if (payload.categoryKey) params.set("categoryKey", payload.categoryKey);
  if (typeof payload.minPrice === "number") params.set("minPrice", String(payload.minPrice));
  if (typeof payload.maxPrice === "number") params.set("maxPrice", String(payload.maxPrice));
  if (payload.sizes?.length) params.set("sizes", payload.sizes.join(","));

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

/* ---------------- COMPONENT ---------------- */
const TopPicks = () => {
  const [open, setOpen] = useState<Drop>(null);
  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>(CATEGORY_TREE_FALLBACK);
  const [catStack, setCatStack] = useState<string[]>([]);

  // Selected values
  const [selectedPath, setSelectedPath] = useState<string>("All"); 
  const [selectedCatOptions, setSelectedCatOptions] = useState<Record<string, string[]>>({});
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<string>(SORT_OPTIONS[0]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [appliedCategoryKey, setAppliedCategoryKey] = useState<string | null>(null);

  // Pagination + products
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCats, setLoadingCats] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(categoryTree, catStack[catStack.length - 1]);
  }, [catStack, categoryTree]);

  const showRoot = open === "category" && catStack.length === 0;
  const showCategoryScreen = open === "category" && catStack.length > 0;

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const loadCats = async () => {
      try {
        setLoadingCats(true);
        const cats = await apiFetchCategories();
        if (Array.isArray(cats) && cats.length) {
          setCategoryTree(cats);
          setUseDemoMode(false);
        }
      } catch {
        // fallback
      } finally {
        setLoadingCats(false);
      }
    };
    loadCats();
  }, []);

  useEffect(() => {
    setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
    setHasMore(ALL_DEMO_PRODUCTS.length > PAGE_SIZE);

    const loadInitialProducts = async () => {
      try {
        setLoadingProducts(true);
        const payload: ProductFiltersPayload = {
          page: 1,
          pageSize: PAGE_SIZE,
          sort: sortValue,
        };
        const resp = await apiFetchProducts(payload);

        setProducts(resp.items);
        if ("hasMore" in resp) {
          setHasMore(resp.hasMore);
        } else {
          setHasMore(resp.total > resp.items.length);
        }
        setUseDemoMode(false);
      } catch {
        // fallback
      } finally {
        setLoadingProducts(false);
      }
    };
    loadInitialProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  /* ---------- UI ACTIONS ---------- */
  const toggleOpen = (d: Drop) => {
    setOpen((prev) => (prev === d ? null : d));
    if (d !== "category") setCatStack([]);
  };

  const goIntoCategory = (key: string) => setCatStack((s) => [...s, key]);
  const goBackCategory = () => setCatStack((s) => s.slice(0, -1));

  const toggleOption = (groupKey: string, option: string) => {
    setSelectedCatOptions((prev) => {
      const existing = prev[groupKey] ?? [];
      const has = existing.includes(option);
      const next = has ? [] : [option];
      return { ...prev, [groupKey]: next };
    });
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((x) => x !== size) : [...prev, size]));
  };

  /* ---------- BACKEND-READY PRODUCT FETCH ---------- */
  type FilterOverrides = {
    categoryKey?: string | null;
    sort?: string;
  };

  const fetchProductsWithCurrentFilters = async (
    nextPage: number,
    mode: "replace" | "append",
    overrides?: FilterOverrides
  ) => {
    if (useDemoMode) {
      const nextCount = nextPage * PAGE_SIZE;
      const nextProducts = ALL_DEMO_PRODUCTS.slice(0, nextCount);
      setProducts(nextProducts);
      setHasMore(nextProducts.length < ALL_DEMO_PRODUCTS.length);
      setPage(nextPage);
      return;
    }

    try {
      setLoadingProducts(true);

      // Fixes the state delay bug: Use the override if provided, otherwise fallback to React state
      const activeCatKey = overrides && "categoryKey" in overrides ? overrides.categoryKey : appliedCategoryKey;
      let finalCategoryKey = activeCatKey ?? undefined;
      
      if (activeCatKey && selectedCatOptions[activeCatKey]?.length > 0) {
        finalCategoryKey = selectedCatOptions[activeCatKey][0];
      }

      const activeSort = overrides?.sort ?? sortValue;

      const payload: ProductFiltersPayload = {
        page: nextPage,
        pageSize: PAGE_SIZE,
        sort: activeSort,
        categoryKey: finalCategoryKey,
        minPrice: toNumberOrUndefined(priceFrom),
        maxPrice: toNumberOrUndefined(priceTo),
        sizes: selectedSizes.length ? selectedSizes : undefined,
      };

      console.group("🟢 FETCH PRODUCTS PAYLOAD");
      console.log("Final Payload sent to backend:", payload);
      console.groupEnd();

      const resp = await apiFetchProducts(payload);

      if (mode === "replace") setProducts(resp.items);
      else setProducts((prev) => [...prev, ...resp.items]);

      if ("hasMore" in resp) {
        setHasMore(resp.hasMore);
      } else {
        const alreadyCount = mode === "replace" ? resp.items.length : products.length + resp.items.length;
        setHasMore(resp.total > alreadyCount);
      }

      setPage(nextPage);
    } catch {
      // backend error ignore
    } finally {
      setLoadingProducts(false);
    }
  };

  const applyCategorySelection = async (stackToApply?: string[]) => {
    const stack = stackToApply ?? catStack;
    const label = buildCategoryLabel(categoryTree, stack);
    setSelectedPath(label);

    const lastKey = stack.length ? stack[stack.length - 1] : null;
    setAppliedCategoryKey(lastKey);

    setOpen(null);
    setCatStack([]);

    // Pass the exact new key directly into the fetch
    await fetchProductsWithCurrentFilters(1, "replace", { categoryKey: lastKey });
  };

  const applyNonCategoryFilters = async () => {
    setOpen(null);
    setCatStack([]);
    await fetchProductsWithCurrentFilters(1, "replace");
  };

  const resetAll = async () => {
    setSelectedPath("All");
    setAppliedCategoryKey(null);
    setSelectedCatOptions({});
    setSelectedSizes([]);
    setSortValue(SORT_OPTIONS[0]);
    setPriceFrom("");
    setPriceTo("");
    setOpen(null);
    setCatStack([]);
    
    // Pass the null key and default sort directly into the fetch
    await fetchProductsWithCurrentFilters(1, "replace", { 
      categoryKey: null, 
      sort: SORT_OPTIONS[0] 
    });
  };

  const onSeeMore = async () => {
    if (!hasMore || loadingProducts) return;
    await fetchProductsWithCurrentFilters(page + 1, "append");
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
          className={`${styles.pill} ${styles.allPill} ${selectedPath === "All" ? styles.pillActive : ""}`}
          type="button"
          onClick={async () => {
            setSelectedPath("All");
            setAppliedCategoryKey(null);
            await fetchProductsWithCurrentFilters(1, "replace", { categoryKey: null });
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
            {selectedPath === "All" ? "Category" : selectedPath} <ChevronDown size={16}/>
          </button>

          {open === "category" && (
            <div className={styles.dropdown}>
              {showRoot && (
                <div className={styles.menuList}>
                  <div className={styles.ddHeader}>
                    Category{loadingCats ? " (Loading…)" : ""}
                  </div>

                  {categoryTree.map((c) => (
                    <button
                      key={c.key}
                      className={styles.menuItem}
                      type="button"
                      onClick={() => {
                        if (c.children && c.children.length) {
                          goIntoCategory(c.key);
                        } else {
                          void applyCategorySelection([c.key]);
                        }
                      }}
                    >
                      <span className={styles.menuLeft}>
                        <span className={styles.iconBox} aria-hidden="true">
                          <Shirt size={16} />
                        </span>
                        <span className={styles.menuLabel}>{c.label}</span>
                      </span>

                      <span className={styles.menuRight} aria-hidden="true">
                        {c.children && c.children.length ? "›" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {showCategoryScreen && (
                <div className={styles.menuScreen}>
                  <div className={styles.menuTop}>
                    <button
                      className={styles.backBtn}
                      type="button"
                      onClick={goBackCategory}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className={styles.menuTitle}>{currentCatNode?.label ?? "Category"}</div>

                    <button className={styles.applyBtn} type="button" onClick={() => void applyCategorySelection()}>
                      Apply
                    </button>
                  </div>

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
                              <Shirt size={16} />
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
                    <div className={styles.checkList}>
                      <div className={styles.ddSubHeader}>Choose options</div>

                      {(currentCatNode?.options ?? []).map((opt) => {
                        const groupKey = currentCatNode?.key ?? "unknown";
                        const checked = (selectedCatOptions[groupKey] ?? []).includes(opt);

                        return (
                          <button
                            key={opt}
                            type="button"
                            className={styles.checkRow}
                            onClick={() => toggleOption(groupKey, opt)}
                          >
                            <span className={styles.checkText}>{opt}</span>

                            <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                              {checked ? "✓" : ""}
                            </span>
                          </button>
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
            Price <ChevronDown size={16} />
          </button>

          {open === "price" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Price Range</div>

              <div className={styles.priceBox}>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>From</label>
                  <input
                    className={styles.priceInput}
                    placeholder="0$"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </div>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>To</label>
                  <input
                    className={styles.priceInput}
                    placeholder="999$"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.ddFooter}>
                <button className={styles.smallBtn} type="button" onClick={() => void applyNonCategoryFilters()}>
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
            Size <ChevronDown size={16} />
          </button>

          {open === "size" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Sizes</div>

              <div className={styles.sizeList}>
                {SIZE_OPTIONS.map((s) => {
                  const checked = selectedSizes.includes(s);
                  return (
                    <button key={s} type="button" className={styles.sizeRow} onClick={() => toggleSize(s)}>
                      <span className={styles.sizeText}>{s}</span>
                      <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                        {checked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.ddFooter}>
                <button className={styles.smallBtn} type="button" onClick={() => void applyNonCategoryFilters()}>
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
            Sort By <ChevronDown size={16} />
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
                    onClick={async () => {
                      setSortValue(opt);
                      setOpen(null);
                      // Pass the new sort value directly
                      await fetchProductsWithCurrentFilters(1, "replace", { sort: opt });
                    }}
                  >
                    <span className={styles.menuLeft}>
                      <span className={styles.menuLabel}>{opt}</span>
                    </span>
                    <span className={`${styles.rightBox} ${sortValue === opt ? styles.rightBoxOn : ""}`} aria-hidden="true">
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
          <ProductCard key={p.id} image={p.image} brand={p.brand} meta={p.meta} price={p.price} likes={p.likes} />
        ))}
      </div>

      {/* Footer / pagination */}
      <div className={styles.footer}>
        <button className={styles.seeMore} type="button" onClick={onSeeMore} disabled={!hasMore || loadingProducts}>
          {loadingProducts ? "Loading…" : hasMore ? "See More" : "No More Products"}
        </button>
      </div>
    </section>
  );
};

export default TopPicks;