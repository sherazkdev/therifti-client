// SearchResults.tsx (backend-ready + extended filters + breadcrumbs)

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchResults.module.css";
import ProductCard from "../productcard/ProductCard"; // Adjust import path if needed
import { ChevronDown } from "../icons";
import { Shirt, ChevronLeft } from "lucide-react";

/* ---------------- TYPES ---------------- */
export type CategoryNode = {
  key: string;
  label: string;
  iconUrl?: string;
  children?: CategoryNode[];
  options?: string[];
};

// Added new drop options
type Drop = "category" | "price" | "size" | "sort" | "condition" | "brand" | "color" | "pattern" | "material" | null;

export type Product = {
  id: string;
  image?: string;
  brand: string;
  meta: string;
  price: string;
  likes: string;
};

/* ---------------- DEFAULT FALLBACK DATA ---------------- */
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
    ],
  },
  { key: "men", label: "Men" },
  { key: "kids", label: "Kids" },
];

const SORT_OPTIONS = ["Recommended", "Newest", "Price: Low to High", "Price: High to Low"];

// NEW FILTER OPTIONS
const SIZE_OPTIONS = ["XXXS / 2", "XXX / 4", "XS / 6", "S / 8", "M / 10", "L / 12", "XL / 14"];
const CONDITION_OPTIONS = ["New with tags", "Like new", "Good", "Fair"];
const BRAND_OPTIONS = ["River Island", "Mango", "Topman", "Nike", "Adidas", "Zara", "ASOS"];
const COLOR_OPTIONS = ["Black", "White", "Blue", "Red", "Green", "Grey", "Brown"];
const PATTERN_OPTIONS = ["Solid", "Striped", "Checked", "Floral", "Graphic"];
const MATERIAL_OPTIONS = ["Cotton", "Polyester", "Denim", "Leather", "Linen"];

const ALL_DEMO_PRODUCTS: Product[] = Array.from({ length: 24 }).map((_, i) => {
  const brands = ["River Island", "Mango", "Topman", "Fashion House", "Zara", "Nike", "Adidas"];
  return {
    id: String(i + 1),
    brand: brands[i % brands.length],
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

// Backend Payload now accepts all new filters
type ProductFiltersPayload = {
  page: number;
  pageSize: number;
  sort: string;
  categoryKey?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  conditions?: string[];
  brands?: string[];
  colors?: string[];
  patterns?: string[];
  materials?: string[];
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
  if (payload.conditions?.length) params.set("conditions", payload.conditions.join(","));
  if (payload.brands?.length) params.set("brands", payload.brands.join(","));
  if (payload.colors?.length) params.set("colors", payload.colors.join(","));
  if (payload.patterns?.length) params.set("patterns", payload.patterns.join(","));
  if (payload.materials?.length) params.set("materials", payload.materials.join(","));

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

/* ---------------- COMPONENT ---------------- */
const SearchResults = () => {
  const [open, setOpen] = useState<Drop>(null);
  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>(CATEGORY_TREE_FALLBACK);
  const [catStack, setCatStack] = useState<string[]>([]);

  // Selected values
  const [selectedPath, setSelectedPath] = useState<string>("All");
  const [selectedCatOptions, setSelectedCatOptions] = useState<Record<string, string[]>>({});
  
  // States for all the filters
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  const [sortValue, setSortValue] = useState<string>(SORT_OPTIONS[0]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [appliedCategoryKey, setAppliedCategoryKey] = useState<string | null>(null);

  // Pagination + products
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(1200); // Used for the "1200 items" text

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCats, setLoadingCats] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(true); // Defaulted to true for testing

  const panelRef = useRef<HTMLDivElement | null>(null);

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(categoryTree, catStack[catStack.length - 1]);
  }, [catStack, categoryTree]);

  const showRoot = open === "category" && catStack.length === 0;
  const showCategoryScreen = open === "category" && catStack.length > 0;

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    // Basic category mock fetch (you can connect real backend here later)
    setLoadingCats(true);
    setTimeout(() => {
      setCategoryTree(CATEGORY_TREE_FALLBACK);
      setLoadingCats(false);
    }, 500);
  }, []);

  useEffect(() => {
    setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
    setHasMore(ALL_DEMO_PRODUCTS.length > PAGE_SIZE);
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
      return { ...prev, [groupKey]: has ? [] : [option] };
    });
  };

  // Helper to toggle any standard string array state
  const toggleArrayState = (
    val: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));
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
    try {
      setLoadingProducts(true);

      const activeCatKey = overrides && "categoryKey" in overrides ? overrides.categoryKey : appliedCategoryKey;
      let finalCategoryKey = activeCatKey ?? undefined;
      
      if (activeCatKey && selectedCatOptions[activeCatKey]?.length > 0) {
        finalCategoryKey = selectedCatOptions[activeCatKey][0];
      }

      const payload: ProductFiltersPayload = {
        page: nextPage,
        pageSize: PAGE_SIZE,
        sort: overrides?.sort ?? sortValue,
        categoryKey: finalCategoryKey,
        minPrice: toNumberOrUndefined(priceFrom),
        maxPrice: toNumberOrUndefined(priceTo),
        sizes: selectedSizes.length ? selectedSizes : undefined,
        conditions: selectedConditions.length ? selectedConditions : undefined,
        brands: selectedBrands.length ? selectedBrands : undefined,
        colors: selectedColors.length ? selectedColors : undefined,
        patterns: selectedPatterns.length ? selectedPatterns : undefined,
        materials: selectedMaterials.length ? selectedMaterials : undefined,
      };

      console.group("🟢 FETCH PRODUCTS PAYLOAD");
      console.log("Final Payload sent to backend:", payload);
      console.groupEnd();

      const resp = await apiFetchProducts(payload);

      const fetchedItems = resp.items || (resp as any).data || (resp as any).products || [];

      if (mode === "replace") {
        setProducts(fetchedItems);
      } else {
        setProducts((prev) => [...prev, ...fetchedItems]);
      }

      if ("total" in resp) setTotalItems(resp.total);

      if ("hasMore" in resp) {
        setHasMore(resp.hasMore);
      } else {
        const alreadyCount = mode === "replace" ? fetchedItems.length : products.length + fetchedItems.length;
        setHasMore((resp as any).total > alreadyCount);
      }

      setPage(nextPage);
    } catch (error) {
      console.log("🔴 API Fetch Failed. Injecting fake data to test UI.");
      
      if (mode === "append") {
        const fakeData = Array.from({ length: 8 }).map((_, i) => ({
          id: `fake-${Date.now()}-${i}`,
          brand: BRAND_OPTIONS[Math.floor(Math.random() * BRAND_OPTIONS.length)],
          meta: "Test · Good",
          price: "$99",
          likes: "1k"
        }));
        setProducts((prev) => [...prev, ...fakeData]);
        setHasMore(true); 
        setPage(nextPage); 
      } else if (mode === "replace") {
         setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
         setHasMore(ALL_DEMO_PRODUCTS.length > PAGE_SIZE);
         setTotalItems(1200);
         setPage(1);
      }
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
    setSelectedConditions([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedPatterns([]);
    setSelectedMaterials([]);
    setSortValue(SORT_OPTIONS[0]);
    setPriceFrom("");
    setPriceTo("");
    setOpen(null);
    setCatStack([]);
    
    await fetchProductsWithCurrentFilters(1, "replace", { 
      categoryKey: null, 
      sort: SORT_OPTIONS[0] 
    });
  };

  // Helper to render simple list dropdowns cleanly
  const renderListDropdown = (title: string, options: string[], state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => (
    <div className={styles.dropdown}>
      <div className={styles.ddHeader}>{title}</div>
      <div className={styles.sizeList}>
        {options.map((opt) => {
          const checked = state.includes(opt);
          return (
            <button key={opt} type="button" className={styles.sizeRow} onClick={() => toggleArrayState(opt, state, setState)}>
              <span className={styles.sizeText}>{opt}</span>
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
  );

  return (
    <section className={styles.wrapper}>
      {/* Search Header + Reset Button */}
      <div className={styles.header}>
        <h2 className={styles.title}>Search</h2>
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
          >
            {selectedPath === "All" ? "Category" : selectedPath} <ChevronDown size={16}/>
          </button>
          {open === "category" && (
            <div className={styles.dropdown}>
              {showRoot && (
                <div className={styles.menuList}>
                  <div className={styles.ddHeader}>Category{loadingCats ? " (Loading…)" : ""}</div>
                  {categoryTree.map((c) => (
                    <button
                      key={c.key}
                      className={styles.menuItem}
                      type="button"
                      onClick={() => {
                        if (c.children?.length) goIntoCategory(c.key);
                        else void applyCategorySelection([c.key]);
                      }}
                    >
                      <span className={styles.menuLeft}>
                        <span className={styles.iconBox}><Shirt size={16} /></span>
                        <span className={styles.menuLabel}>{c.label}</span>
                      </span>
                      <span className={styles.menuRight}>{c.children?.length ? "›" : ""}</span>
                    </button>
                  ))}
                </div>
              )}

              {showCategoryScreen && (
                <div className={styles.menuScreen}>
                  <div className={styles.menuTop}>
                    <button className={styles.backBtn} type="button" onClick={goBackCategory}>
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
                        <button key={child.key} className={styles.menuItem} type="button" onClick={() => goIntoCategory(child.key)}>
                          <span className={styles.menuLeft}>
                            <span className={styles.iconBox}><Shirt size={16} /></span>
                            <span className={styles.menuLabel}>{child.label}</span>
                          </span>
                          <span className={styles.menuRight}>›</span>
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
                          <button key={opt} type="button" className={styles.checkRow} onClick={() => toggleOption(groupKey, opt)}>
                            <span className={styles.checkText}>{opt}</span>
                            <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>{checked ? "✓" : ""}</span>
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
          <button className={`${styles.pill} ${open === "price" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("price")}>
            Price <ChevronDown size={16} />
          </button>
          {open === "price" && (
            <div className={styles.dropdown}>
              <div className={styles.ddHeader}>Price Range</div>
              <div className={styles.priceBox}>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>From</label>
                  <input className={styles.priceInput} placeholder="0$" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
                </div>
                <div className={styles.priceField}>
                  <label className={styles.priceLabel}>To</label>
                  <input className={styles.priceInput} placeholder="999$" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
                </div>
              </div>
              <div className={styles.ddFooter}>
                <button className={styles.smallBtn} type="button" onClick={() => void applyNonCategoryFilters()}>Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Filters */}
        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "size" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("size")}>
            Size <ChevronDown size={16} />
          </button>
          {open === "size" && renderListDropdown("Sizes", SIZE_OPTIONS, selectedSizes, setSelectedSizes)}
        </div>

        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "condition" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("condition")}>
            Condition <ChevronDown size={16} />
          </button>
          {open === "condition" && renderListDropdown("Condition", CONDITION_OPTIONS, selectedConditions, setSelectedConditions)}
        </div>

        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "brand" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("brand")}>
            Brand <ChevronDown size={16} />
          </button>
          {open === "brand" && renderListDropdown("Brands", BRAND_OPTIONS, selectedBrands, setSelectedBrands)}
        </div>

        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "color" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("color")}>
            Color <ChevronDown size={16} />
          </button>
          {open === "color" && renderListDropdown("Colors", COLOR_OPTIONS, selectedColors, setSelectedColors)}
        </div>

        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "pattern" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("pattern")}>
            Pattern <ChevronDown size={16} />
          </button>
          {open === "pattern" && renderListDropdown("Patterns", PATTERN_OPTIONS, selectedPatterns, setSelectedPatterns)}
        </div>

        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "material" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("material")}>
            Material <ChevronDown size={16} />
          </button>
          {open === "material" && renderListDropdown("Materials", MATERIAL_OPTIONS, selectedMaterials, setSelectedMaterials)}
        </div>

        {/* Sort By (Kept on the left alongside the other pills as requested) */}
        <div className={styles.dropWrap}>
          <button className={`${styles.pill} ${open === "sort" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("sort")}>
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
                      await fetchProductsWithCurrentFilters(1, "replace", { sort: opt });
                    }}
                  >
                    <span className={styles.menuLeft}><span className={styles.menuLabel}>{opt}</span></span>
                    <span className={`${styles.rightBox} ${sortValue === opt ? styles.rightBoxOn : ""}`}>{sortValue === opt ? "✓" : ""}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs & Item Count Row */}
      <div className={styles.metaRow}>
        <div className={styles.breadcrumbs}>
          Home / Men / <span>{selectedPath}</span>
        </div>
        <div className={styles.itemCount}>{totalItems} items</div>
      </div>

      {/* Products Grid */}
      <div className={styles.grid}>
        {products.map((p, index) => (
          <ProductCard 
            key={`${p.id}-${index}`} 
            image={p.image} 
            brand={p.brand} 
            meta={p.meta} 
            price={p.price} 
            likes={p.likes} 
          />
        ))}
      </div>

      {/* Footer / pagination */}
      <div className={styles.footer}>
        <button className={styles.seeMore} type="button" onClick={() => fetchProductsWithCurrentFilters(page + 1, "append")} disabled={!hasMore || loadingProducts}>
          {loadingProducts ? "Loading…" : hasMore ? "See More" : "No More Products"}
        </button>
      </div>
    </section>
  );
};

export default SearchResults;