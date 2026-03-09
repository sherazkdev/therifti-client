// TopPicks.tsx (backend-ready + payload simplified + state lag fixed + Skeletons)

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TopPicks.module.css";
import ProductCard from "../productcard/ProductCard";
import { ChevronDown } from "../../components/icons";
import { Shirt } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { categories } from "../../data/categories";
import type { CategoryDocument } from "../../types/category/category.types";
import FilterBar from "./components/FilterBar/Filterbar";

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

const SIZE_OPTIONS = ["XXXS / 2", "XXX / 4", "XS / 6", "S / 8", "M / 10"];
const SORT_OPTIONS = ["PRICE_HIGH_TO_LOW","PRICE_LOW_TO_HIGH","NEWEST_FIRST","RELEVANCE"];

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

const PAGE_SIZE = 8;

function buildCategoryLabel(tree: CategoryDocument[], stack: string[]) {
  const labels = stack
    .map((k) => findNodeByKey(tree, k)?.title)
    .filter(Boolean) as string[];
  return labels.length ? labels.join(" / ") : "All";
}

function toNumberOrUndefined(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

import useFeaturedProducts from "../../hooks/server/product/useFeaturedProducts";
import type { FeaturedProductFilters } from "../../hooks/useFeaturedProducts";
import type { FeaturedProductsSortingInterface } from "../../services/api/product/product.types";

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
  const [categoryTree, setCategoryTree] = useState<CategoryDocument[]>(categories);
  const [catStack, setCatStack] = useState<string[]>([]);


  
  // Selected values
  const [selectedPath, setSelectedPath] = useState<string>("All"); 
  const [selectedCatOptions, setSelectedCatOptions] = useState<Record<string, string[]>>({});
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<string>(SORT_OPTIONS[0]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  useEffect( () => {
    console.log(selectedPath)
  },[selectedPath])

  const [appliedCategoryKey, setAppliedCategoryKey] = useState<string | null>(null);

  // Pagination + products
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCats, setLoadingCats] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const featuredProductMutation = useFeaturedProducts();

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(categoryTree, catStack[catStack.length - 1]);
  }, [catStack, categoryTree]);

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    const loadCats = async () => {
      try {
        setLoadingCats(true);
        // const cats = await apiFetchCategories();
        // if (Array.isArray(cats) && cats.length) {
          setCategoryTree(categories);
          setUseDemoMode(false);
        // }
      } catch {
        // fallback
      } finally {
        setLoadingCats(false);
      }
    };
    loadCats();
  }, []);

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setLoadingProducts(true);
        // Instant clear for skeletons
        setProducts([]);

        const payload: FeaturedProductsSortingInterface = {
          limit:PAGE_SIZE,
          page:page,
          price:{
            min:Number(priceFrom),
            max:Number(priceTo),
          },
          sizes:null,
          sort:"PRICE_LOW_TO_HIGH",
          categoryId:null
        };
        const response = featuredProductMutation.mutate(payload,{
          onError:(e) => console.log(e),
          onSuccess:(productsD) => setProducts(productsD.data)
        });

        setUseDemoMode(false);
        setLoadingProducts(false); // Stop loading on success
      } catch {
        // Force a delay so the skeletons are visible during demo mode
        setTimeout(() => {
          setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
          setHasMore(ALL_DEMO_PRODUCTS.length > PAGE_SIZE);
          setLoadingProducts(false); // Stop loading after fake data sets
        }, 1000);
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

      // ---> NEW LOGIC: Clear products immediately if applying a new filter to show Skeletons <---
      if (mode === "replace") {
        setProducts([]);
      }

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

      console.group("FETCH PRODUCTS PAYLOAD");
      console.log("Final Payload sent to backend:", payload);
      console.groupEnd();

      const resp = await apiFetchProducts(payload);

      const fetchedItems = resp.items || (resp as any).data || (resp as any).products || [];

      if (mode === "replace") {
        setProducts(fetchedItems);
      } else {
        setProducts((prev) => [...prev, ...fetchedItems]);
      }

      if ("hasMore" in resp) {
        setHasMore(resp.hasMore);
      } else {
        const alreadyCount = mode === "replace" ? fetchedItems.length : products.length + fetchedItems.length;
        setHasMore(resp.total > alreadyCount);
      }

      setPage(nextPage);
      setLoadingProducts(false); // Stop loading on success
    } catch (error) {
      console.log(" API Fetch Failed. Injecting fake data to test UI.");
      
      // Delay so you can actually see the skeleton shimmer!
      setTimeout(() => {
        if (mode === "append") {
          const fakeData = [
            { id: `fake-${Date.now()}-1`, brand: "Test Brand 1", meta: "Test", price: "$99", likes: "1k" },
            { id: `fake-${Date.now()}-2`, brand: "Test Brand 2", meta: "Test", price: "$99", likes: "1k" },
            { id: `fake-${Date.now()}-3`, brand: "Test Brand 3", meta: "Test", price: "$99", likes: "1k" },
            { id: `fake-${Date.now()}-4`, brand: "Test Brand 4", meta: "Test", price: "$99", likes: "1k" },
          ];
          setProducts((prev) => [...prev, ...fakeData]);
          setHasMore(true); 
          setPage(nextPage); 
        } else if (mode === "replace") {
           setProducts(ALL_DEMO_PRODUCTS.slice(0, PAGE_SIZE));
           setHasMore(ALL_DEMO_PRODUCTS.length > PAGE_SIZE);
           setPage(1);
        }
        setLoadingProducts(false); // Stop loading after fake data sets
      }, 1000);
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
      <FilterBar
        open={open}
        toggleOpen={toggleOpen}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        categoryTree={categoryTree}
        catStack={catStack}
        setCatStack={setCatStack}
        currentCatNode={currentCatNode}
        goIntoCategory={goIntoCategory}
        goBackCategory={goBackCategory}
        applyCategorySelection={applyCategorySelection}
        selectedSizes={selectedSizes}
        toggleSize={toggleSize}
        SIZE_OPTIONS={SIZE_OPTIONS}
        sortValue={sortValue}
        setSortValue={setSortValue}
        SORT_OPTIONS={SORT_OPTIONS}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        applyNonCategoryFilters={applyNonCategoryFilters}
        selectedCatOptions={selectedCatOptions}
        toggleOption={toggleOption}
        loadingCats={loadingCats}
      />

      {/* ---> NEW: SMART SKELETON PRODUCTS GRID <--- */}
      <div className={styles.grid}>
        
        {/* 1. FRESH SEARCH: If loading and array is empty, show 8 skeletons */}
        {loadingProducts && products.length === 0 && (
          Array.from({ length: 8 }).map((_, idx) => (
            <ProductCard key={`skel-main-${idx}`} isLoading={true} brand="" meta="" price="" />
          ))
        )}

        {/* 2. REAL CARDS: Map through actual products */}
        {products.map((p, index) => (
          <ProductCard 
            key={`${p._id}-${index}`} 
            image={p.coverImage} 
            brand={p.brand} 
            meta={p.title} 
            price={p.price} 
            likes={p.totalLikes} 
          />
        ))}

        {/* 3. PAGINATION: If loading but we already have products, show 4 skeletons at the bottom */}
        {loadingProducts && products.length > 0 && (
          Array.from({ length: 4 }).map((_, idx) => (
            <ProductCard key={`skel-append-${idx}`} isLoading={true} brand="" meta="" price="" />
          ))
        )}

      </div>

      {/* Footer / pagination */}
      <div className={styles.footer}>
        {/* Hide 'See More' if there are no products loaded at all */}
        {!loadingProducts && products.length === 0 ? (
          <p>No products found for these filters.</p>
        ) : (
          <button className={styles.seeMore} type="button" onClick={onSeeMore} disabled={!hasMore || loadingProducts}>
            {loadingProducts ? "Loading…" : hasMore ? "See More" : "No More Products"}
          </button>
        )}
      </div>
    </section>
  );
};

export default TopPicks;