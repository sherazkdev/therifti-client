import { useState } from "react";

/**
 * Shared product shape for the TopPicks grid.
 * If your backend returns a richer shape, adapt the mapping inside `fetchProducts`.
 */
export type Product = {
  id: string;
  image?: string;
  brand: string;
  meta: string;
  price: string;
  likes: string;
};

/**
 * Filters that affect which products are fetched.
 * TopPicks builds this object from its UI state and passes it into the hook.
 */
export type FeaturedProductFilters = {
  sort: string;
  appliedCategoryKey: string | null;
  selectedCatOptions: Record<string, string[]>;
  priceFrom: string;
  priceTo: string;
  selectedSizes: string[];
};

type FetchMode = "replace" | "append";

type FilterOverrides = {
  categoryKey?: string | null;
  sort?: string;
};

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

const PAGE_SIZE = 8;

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

function toNumberOrUndefined(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Centralised data layer for TopPicks:
 * - Owns product list, pagination and loading state
 * - Talks to the `/api/products` endpoint (or demo data when the API fails)
 * - Knows how to translate UI filters into an API payload
 */
export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);

  const fetchProducts = async (
    filters: FeaturedProductFilters,
    nextPage: number,
    mode: FetchMode,
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

      if (mode === "replace") {
        // Clear immediately so skeletons can render
        setProducts([]);
      }

      const activeCatKey =
        overrides && "categoryKey" in overrides ? overrides.categoryKey : filters.appliedCategoryKey;

      let finalCategoryKey = activeCatKey ?? undefined;

      if (activeCatKey && filters.selectedCatOptions[activeCatKey]?.length > 0) {
        finalCategoryKey = filters.selectedCatOptions[activeCatKey][0];
      }

      const activeSort = overrides?.sort ?? filters.sort;

      const payload: ProductFiltersPayload = {
        page: nextPage,
        pageSize: PAGE_SIZE,
        sort: activeSort,
        categoryKey: finalCategoryKey,
        minPrice: toNumberOrUndefined(filters.priceFrom),
        maxPrice: toNumberOrUndefined(filters.priceTo),
        sizes: filters.selectedSizes.length ? filters.selectedSizes : undefined,
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
      setUseDemoMode(false);
      setLoadingProducts(false);
    } catch (error) {
      console.log(" API Fetch Failed. Injecting fake data to test UI.");

      // Delay so you can see the skeleton shimmer during demo mode
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
        setUseDemoMode(true);
        setLoadingProducts(false);
      }, 1000);
    }
  };

  return {
    products,
    page,
    hasMore,
    loadingProducts,
    fetchProducts,
  };
}

