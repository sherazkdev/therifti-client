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

import useSearchProducts from "../../hooks/server/product/useSearchProducts"; 

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
  return labels.length ? labels.join(" / ") : ""; 
}

interface SearchProps {
  initialCategoryId?: string | null;
  initialQuery?: string | null;
  initialBreadcrumb?: string; 
}

const Search = ({ initialCategoryId = null, initialQuery = null, initialBreadcrumb = "" }: SearchProps) => {
  const [open, setOpen] = useState<Drop>(null);
  const [categoryTree] = useState<CategoryDocument[]>(categories);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Search Specific States
  const [query, setQuery] = useState<string | null>(initialQuery);
  const [breadcrumb, setBreadcrumb] = useState<string>(initialBreadcrumb || initialQuery || "All Products");

  // Category States
  const [catStack, setCatStack] = useState<string[]>([]);
  const [selectedPath] = useState("Category"); 
  const [appliedCategoryKey, setAppliedCategoryKey] = useState<string | null>(initialCategoryId);
  
  //  Temporary state for holding category selection before clicking "Apply"
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);

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

  /* ---------------- URL UPDATE ---------------- */
  const updateURL = useCallback((payload: SearchProductsPayloadInterface) => {
    const params = new URLSearchParams(window.location.search);
    if (payload.q) params.set("q", payload.q);
    else params.delete("q");

    if (payload.categoryId) params.set("category", payload.categoryId);
    else params.delete("category");

    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = useCallback(
    (
      nextPage: number, 
      mode: "replace" | "append", 
      overrideCategory?: string | null, 
      newSort?: ProductSort,
      overrideQuery?: string | null 
    ) => {
      setLoadingProducts(true);
      if (mode === "replace") setProducts([]);

      const finalCategory = overrideCategory !== undefined ? overrideCategory : appliedCategoryKey;
      const finalQuery = overrideQuery !== undefined ? overrideQuery : query;

      const payload: SearchProductsPayloadInterface = {
        q: finalQuery || undefined,
        categoryId: finalCategory || undefined,
        page: nextPage,
        limit: PAGE_SIZE, 
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
    fetchProducts(1, "replace", initialCategoryId, sortValue, initialQuery);
  }, [initialCategoryId, initialQuery]);

  /* ---------------- CLICK OUTSIDE ---------------- */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) {
        setOpen(null);
        setCatStack([]);
        setPendingCategory(null); // Clear pending if user clicks outside
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const toggleOpen = (d: Drop) => {
    setOpen((prev) => (prev === d ? null : d));
    if (d !== "category") {
      setCatStack([]);
      setPendingCategory(null);
    }
  };

  const goIntoCategory = (key: string) => setCatStack((s) => [...s, key]);
  const goBackCategory = () => setCatStack((s) => s.slice(0, -1));

  const toggleArrayFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  };

  const handleSortChange = (value: ProductSort) => {
    setSortValue(value);
    setPage(1);
    setOpen(null);
    fetchProducts(1, "replace", undefined, value);
  };

  //  Apply Category abb pending state check karega
  const applyCategorySelection = (explicitId?: string) => {
    let finalLabel = buildCategoryLabel(categoryTree, catStack);
    
    const targetId = explicitId || pendingCategory;

    if (targetId) {
       const node = findNodeByKey(categoryTree, targetId);
       if (node) {
         finalLabel = finalLabel ? `${finalLabel} / ${node.title}` : node.title;
       }
    }

    const lastKey = targetId ?? (catStack.length ? catStack[catStack.length - 1] : null);

    setAppliedCategoryKey(lastKey);
    setBreadcrumb(finalLabel || "All Products");

    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);

    setPage(1);
    setOpen(null);
    setCatStack([]);
    setPendingCategory(null); // Applied ho gaya toh pending saaf kar do
    fetchProducts(1, "replace", lastKey, undefined, query); 
  };

  const applyNonCategoryFilters = () => {
    setPage(1);
    setOpen(null);
    setCatStack([]);
    fetchProducts(1, "replace");
  };

  /* ---------------- RESET ALL ---------------- */
  const resetAll = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedConditions([]);
    setSelectedColors([]);
    setPriceFrom("");
    setPriceTo("");
    setSortValue("RELEVANCE");

    setAppliedCategoryKey(null);
    setBreadcrumb("All Products"); 
    setQuery(null);

    setPage(1);
    setOpen(null);
    setCatStack([]);
    setPendingCategory(null);

    window.history.replaceState(null, "", window.location.pathname);
    fetchProducts(1, "replace", null, "RELEVANCE", null); 
  };

  const onSeeMore = () => {
    if (!hasMore || loadingProducts) return;
    fetchProducts(page + 1, "append");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Items</h2>
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
        
        // Nayi state props for holding option before clicking Apply
        pendingCategory={pendingCategory}
        setPendingCategory={setPendingCategory}

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

      <div className={styles.breadcrumb}>
        {breadcrumb}
      </div>

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