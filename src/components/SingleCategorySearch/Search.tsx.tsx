import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./Search.module.css"; 
import ProductCard from "../productcard/ProductCard";
import { categories } from "../../data/categories";
import SearchFilterBar from "./component/SearchFilterBar";
import type { CategoryDocument } from "../../types/category/category.types";
import type {
  SearchProductsPayloadInterface,
  ProductSort,
} from "../../services/api/product/product.types";

import useSearchProducts from "../../hooks/server/product/useSearchProducts"; // Apne hook ka path theek kar lein

export type Drop = "category" | "price" | "size" | "brand" | "material" | "condition" | "color" | "sort" | null;

const PAGE_SIZE = 1;

const SORT_OPTIONS: ProductSort[] = [
  "RELEVANCE",
  "NEWEST_FIRST",
  "PRICE_LOW_TO_HIGH",
  "PRICE_HIGH_TO_LOW"
];

/* ---------------- HELPERS ---------------- */
function findNodeByKey(nodes: CategoryDocument[], key: string): CategoryDocument | null {
  for (const n of nodes) {
    if (n._id === key) return n;
    if (n.children) {
      const hit = findNodeByKey(n.children, key);
      if (hit) return hit;
    }
  }
  return null;
}

function buildCategoryLabel(tree: CategoryDocument[], stack: string[]) {
  const labels = stack
    .map((k) => findNodeByKey(tree, k)?.title)
    .filter(Boolean) as string[];
  return labels.length ? labels.join(" / ") : "Category";
}

interface SearchProps {
  initialCategoryId?: string | null;
  initialQuery?: string | null;
  initialBreadcrumb?: string; // e.g. "Home / Electronics / Mobiles"
}

const Search = ({ initialCategoryId = null, initialQuery = null, initialBreadcrumb = "All Products" }: SearchProps) => {
  const [open, setOpen] = useState<Drop>(null);
  const [categoryTree] = useState<CategoryDocument[]>(categories);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Search Specific States
  const [query, setQuery] = useState<string | null>(initialQuery);
  const [breadcrumb, setBreadcrumb] = useState<string>(initialBreadcrumb);

  // Category States
  const [catStack, setCatStack] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState(initialBreadcrumb.split("/").pop()?.trim() || "Category");
  const [appliedCategoryKey, setAppliedCategoryKey] = useState<string | null>(initialCategoryId);

  // Filter States
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<ProductSort>("RELEVANCE");

  // Pagination & Data States
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const searchProductMutation = useSearchProducts();

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(categoryTree, catStack[catStack.length - 1]);
  }, [catStack, categoryTree]);

  /* ---------------- URL UPDATE (Optional, if you want sharable links) ---------------- */
  const updateURL = useCallback((payload: SearchProductsPayloadInterface) => {
    const params = new URLSearchParams(window.location.search);
    if (payload.q) params.set("q", payload.q);
    if (payload.categoryId) params.set("category", payload.categoryId);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
   /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = useCallback(
    (
      nextPage: number, 
      mode: "replace" | "append", 
      overrideCategory?: string | null, 
      newSort?: ProductSort,
      overrideQuery?: string | null // ✅ Naya parameter for clearing query
    ) => {
      setLoadingProducts(true);
      if (mode === "replace") setProducts([]);

      //  Agar parameter mein null aaya hai toh strictly usko use karo, warna state wala use karo
      const finalCategory = overrideCategory !== undefined ? overrideCategory : appliedCategoryKey;
      const finalQuery = overrideQuery !== undefined ? overrideQuery : query;

      const payload: SearchProductsPayloadInterface = {
        q: finalQuery || undefined,
        categoryId: finalCategory || undefined,
        page: nextPage,
        limit: PAGE_SIZE, // Make sure yeh 10 ho
        sort: newSort ?? sortValue,
        price: priceFrom || priceTo ? { min: priceFrom ? Number(priceFrom) : undefined, max: priceTo ? Number(priceTo) : undefined } : undefined,
        sizes: selectedSizes.length ? selectedSizes : undefined,
        brands: selectedBrands.length ? selectedBrands : undefined,
        materials: selectedMaterials.length ? selectedMaterials : undefined,
        conditions: selectedConditions.length ? selectedConditions : undefined,
        colors: selectedColors.length ? selectedColors : undefined,
      };

      updateURL(payload);

      searchProductMutation.mutate(payload, {
        onSuccess: (res) => {
          const newProducts = res.data || [];
          setProducts((prev) => mode === "replace" ? newProducts : [...prev, ...newProducts]);
          setHasMore(newProducts.length === PAGE_SIZE);
          setPage(nextPage);
          setLoadingProducts(false);
        },
        onError: () => setLoadingProducts(false),
      });
    },
    [query, appliedCategoryKey, priceFrom, priceTo, selectedSizes, selectedBrands, selectedMaterials, selectedConditions, selectedColors, sortValue, updateURL, searchProductMutation]
  );

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    // Component mount hoty hi data fetch karega based on props
    fetchProducts(1, "replace", initialCategoryId, sortValue);
  }, [initialCategoryId, initialQuery]);

  /* ---------------- CLICK OUTSIDE ---------------- */
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

  /* ---------------- ACTIONS ---------------- */
  const toggleOpen = (d: Drop) => {
    setOpen((prev) => (prev === d ? null : d));
    if (d !== "category") setCatStack([]);
  };

  const goIntoCategory = (key: string) => setCatStack((s) => [...s, key]);
  const goBackCategory = () => setCatStack((s) => s.slice(0, -1));

  // Generic Toggle Function array filters ke liye
  const toggleArrayFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  };

  const handleSortChange = (value: ProductSort) => {
    setSortValue(value);
    setPage(1);
    setOpen(null);
    fetchProducts(1, "replace", undefined, value);
  };

  const applyCategorySelection = (explicitId?: string) => {
    const label = buildCategoryLabel(categoryTree, catStack);
    const lastKey = explicitId ?? (catStack.length ? catStack[catStack.length - 1] : null);

    setSelectedPath(label);
    setAppliedCategoryKey(lastKey);
    setBreadcrumb(`Home / Search / ${label}`); // Update breadcrumb dynamically

    // Reset inner filters when category changes
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);

    setPage(1);
    setOpen(null);
    setCatStack([]);
    fetchProducts(1, "replace", lastKey);
  };

  const applyNonCategoryFilters = () => {
    setPage(1);
    setOpen(null);
    setCatStack([]);
    fetchProducts(1, "replace");
  };

  /* ---------------- RESET ALL ---------------- */
  const resetAll = () => {
    // 1. Saare Filters Reset
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedConditions([]);
    setSelectedColors([]);
    setPriceFrom("");
    setPriceTo("");
    setSortValue("RELEVANCE");

    // Category aur Query completely Reset
    setAppliedCategoryKey(null);
    setSelectedPath("Category"); 
    setBreadcrumb("Home / All Products");
    setQuery(null);

    setPage(1);
    setOpen(null);
    setCatStack([]);

    window.history.replaceState(null, "", window.location.pathname);

    //  API ko strictly NULL category aur NULL query bhejo
    fetchProducts(1, "replace", null, "RELEVANCE", null); 
  };

  const onSeeMore = () => {
    if (!hasMore || loadingProducts) return;
    fetchProducts(page + 1, "append");
  };

  return (
    <section className={styles.wrapper}>
      {/* Search Header & Breadcrumb */}
      <div className={styles.header}>
        <div>
          <span style={{ fontSize: "12px", color: "#666", marginBottom: "4px", display: "block" }}>
            {breadcrumb}
          </span>
          <h2 className={styles.title}>
            {query ? `Results for "${query}"` : "Search Products"}
          </h2>
        </div>

        <button className={styles.resetBtn} onClick={resetAll}>
          Clear Filters
        </button>
      </div>

      <SearchFilterBar
        open={open}
        toggleOpen={toggleOpen}
        selectedPath={selectedPath}
        categoryTree={categoryTree}
        catStack={catStack}
        currentCatNode={currentCatNode}
        goIntoCategory={goIntoCategory}
        goBackCategory={goBackCategory}
        applyCategorySelection={applyCategorySelection}
        
        // Dynamic States
        categoryId={appliedCategoryKey}
        selectedSizes={selectedSizes}
        toggleSize={(s) => toggleArrayFilter(setSelectedSizes, s)}
        selectedBrands={selectedBrands}
        toggleBrand={(b) => toggleArrayFilter(setSelectedBrands, b)}
        selectedMaterials={selectedMaterials}
        toggleMaterial={(m) => toggleArrayFilter(setSelectedMaterials, m)}
        
        // Static States
        selectedConditions={selectedConditions}
        toggleCondition={(c) => toggleArrayFilter(setSelectedConditions, c)}
        selectedColors={selectedColors}
        toggleColor={(c) => toggleArrayFilter(setSelectedColors, c)}
        
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        
        sortValue={sortValue}
        setSortValue={handleSortChange}
        SORT_OPTIONS={SORT_OPTIONS}
        applyNonCategoryFilters={applyNonCategoryFilters}
        panelRef={panelRef}
      />

      {/* Grid */}
      <div className={styles.grid}>
        {loadingProducts && products.length === 0 &&
          Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <ProductCard key={`skel-${idx}`} isLoading brand="" meta="" price="" />
          ))}

        {products.map((p, index) => (
          <ProductCard
            key={`${p._id}-${index}`}
            image={p.coverImage}
            brand={p.brand}
            meta={p.title}
            price={p.price}
            likes={p.totalLikes}
            condition={p.condition}
            parcelSize={p.parcelSize}
          />
        ))}
      </div>

      <div className={styles.footer}>
        {!loadingProducts && products.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          <button className={styles.seeMore} onClick={onSeeMore} disabled={!hasMore || loadingProducts}>
            {loadingProducts ? "Loading…" : hasMore ? "See More" : "No More Products"}
          </button>
        )}
      </div>
    </section>
  );
};

export default Search;