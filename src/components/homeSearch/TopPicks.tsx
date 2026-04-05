import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./TopPicks.module.css";
import ProductCard from "../productcard/ProductCard";
import { useUI } from "../../contexts/ui/ui.context";
import FilterBar from "./components/FilterBar/Filterbar";

/** Constants */
import { SORT_OPTIONS } from "../../constants/constants";

/** Types */
import type { FeaturedProductsSortingInterface, ProductSort} from "../../types/api/product.types";
import type { CategoryDocument } from "../../types/api/category.types";
import type { Drop } from "../../types/components"

/** Hooks */
import useFeaturedProducts from "../../hooks/server/product/useFeaturedProducts";

let PAGE_SIZE = 1;

function findNodeByKey(
  nodes: CategoryDocument[],
  key: string
): CategoryDocument | null {
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

  return labels.length ? labels.join(" / ") : "All";
}

const TopPicks = () => {
  const {categories} = useUI();
  const [open, setOpen] = useState<Drop>(null);
  const [categoryTree] = useState<CategoryDocument[]>(categories);

  const [catStack, setCatStack] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState("All");

  const [appliedCategoryKey, setAppliedCategoryKey] =
    useState<string | null>(null);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<ProductSort>(SORT_OPTIONS[0]);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [selectedCatOptions, setSelectedCatOptions] = useState<
    Record<string, string[]>
  >({});

  const panelRef = useRef<HTMLDivElement | null>(null);

  const featuredProductMutation = useFeaturedProducts();

  const SIZE_OPTIONS: string[] = [];
  const loadingCats = false;

  const currentCatNode = useMemo(() => {
    if (catStack.length === 0) return null;
    return findNodeByKey(categoryTree, catStack[catStack.length - 1]);
  }, [catStack, categoryTree]);

  /* ---------------- URL UPDATE ---------------- */

  const updateURL = useCallback(
    (payload: FeaturedProductsSortingInterface) => {
      const params = new URLSearchParams();

      if (payload.categoryId) params.set("category", payload.categoryId);
      if (payload.sort) params.set("sort", payload.sort);
      if (payload.page) params.set("page", String(payload.page));

      if (payload.price?.min)
        params.set("min", String(payload.price.min));
      if (payload.price?.max)
        params.set("max", String(payload.price.max));

      if (payload.sizes?.length)
        params.set("sizes", payload.sizes.join(","));

      window.history.replaceState(null, "", `?${params.toString()}`);
    },
    []
  );

  /* ---------------- FETCH PRODUCTS ---------------- */

  const fetchProducts = useCallback(
    (
      nextPage: number,
      mode: "replace" | "append",
      categoryId?: string | null,
      newSort?: ProductSort
    ) => {
      setLoadingProducts(true);

      if (mode === "replace") setProducts([]);

      const payload: FeaturedProductsSortingInterface = {
        page: nextPage,
        limit: 1,
        categoryId:
          categoryId !== undefined
            ? categoryId
            : appliedCategoryKey || undefined,
        sort: newSort ?? sortValue,
        sizes: selectedSizes.length ? selectedSizes : undefined,
        price:
          priceFrom || priceTo
            ? {
                min: priceFrom ? Number(priceFrom) : undefined,
                max: priceTo ? Number(priceTo) : undefined,
              }
            : undefined,
      };

      updateURL(payload);

      featuredProductMutation.mutate(payload, {
        onSuccess: (res) => {
          const newProducts = res.data || [];

          setProducts((prev) =>
            mode === "replace" ? newProducts : [...prev, ...newProducts]
          );

          setHasMore(newProducts.length === PAGE_SIZE);
          setPage(nextPage);
          setLoadingProducts(false);
        },
        

        onError: () => setLoadingProducts(false),
      });
    },
    [
      appliedCategoryKey,
      priceFrom,
      priceTo,
      selectedSizes,
      sortValue,
      updateURL,
      featuredProductMutation,
    ]
  );

  /* ---------------- LOAD FROM URL ---------------- */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const sort = params.get("sort") as ProductSort | null;
    const pageParam = params.get("page");
    const min = params.get("min");
    const max = params.get("max");
    const sizes = params.get("sizes");

    if (category) setAppliedCategoryKey(category);
    if (sort) setSortValue(sort);
    if (pageParam) setPage(Number(pageParam));
    if (min) setPriceFrom(min);
    if (max) setPriceTo(max);
    if (sizes) setSelectedSizes(sizes.split(","));

    fetchProducts(
      Number(pageParam) || 1,
      "replace",
      category ?? undefined,
      sort ?? undefined
    );
  }, []);

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

  const goIntoCategory = (key: string) =>
    setCatStack((s) => [...s, key]);

  const goBackCategory = () =>
    setCatStack((s) => s.slice(0, -1));

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((x) => x !== size)
        : [...prev, size]
    );
  };

  const toggleOption = (groupKey: string, option: string) => {
    setSelectedCatOptions((prev) => {
      const group = prev[groupKey] ?? [];
      const exists = group.includes(option);

      const updated = exists
        ? group.filter((x) => x !== option)
        : [...group, option];

      return { ...prev, [groupKey]: updated };
    });
  };

  const handleSortChange = (value: ProductSort) => {
    setSortValue(value);
    setPage(1);
    setOpen(null);

    fetchProducts(1, "replace", undefined, value);
  };

  const applyCategorySelection = (explicitId?: string) => {
    const label = buildCategoryLabel(categoryTree, catStack);

    const lastKey =
      explicitId ??
      (catStack.length ? catStack[catStack.length - 1] : null);

    setSelectedPath(label);
    setAppliedCategoryKey(lastKey);

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

  const resetAll = () => {
    const resetSort: ProductSort = SORT_OPTIONS[0];

    setSelectedPath("All");
    setAppliedCategoryKey(null);
    setSelectedSizes([]);
    setSortValue(resetSort);

    setPriceFrom("");
    setPriceTo("");

    setPage(1);
    setOpen(null);
    setCatStack([]);

    window.history.replaceState(null, "", "?page=1");

    fetchProducts(1, "replace", null, resetSort);
  };

  const onSeeMore = () => {
    if (!hasMore || loadingProducts) return;
    fetchProducts(page + 1, "append");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Picks</h2>

        <button
          className={styles.resetBtn}
          onClick={resetAll}
        >
          Reset
        </button>
      </div>

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
        setSortValue={handleSortChange}
        SORT_OPTIONS={SORT_OPTIONS}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        applyNonCategoryFilters={applyNonCategoryFilters}
        selectedCatOptions={selectedCatOptions}
        toggleOption={toggleOption}
        loadingCats={loadingCats}
        categoryId={appliedCategoryKey}
      />

      <div className={styles.grid}>
        {loadingProducts && products.length === 0 &&
          Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <ProductCard
              key={`skel-${idx}`}
              isLoading
              brand=""
              meta=""
              price=""
            />
          ))}

        {products.map((p, index) => (
          <ProductCard
            key={`${p._id}-${index}`}
            _id={p._id}
            coverImage={p.coverImage}
            isLiked={p.isLiked}
            brand={p.brand}
            meta={p.title}
            price={p.price}
            likes={p.totalLikes}
            condition={p.condition}
            parcelSize={p.parcelSize}
          />
        ))}

        {loadingProducts && page > 1 &&
          Array.from({ length: 1 }).map((_, idx) => (
            <ProductCard
              
              key={`skel-more-${idx}`}
              isLoading
              brand=""
              meta=""
              price=""
            />
          ))}
      </div>

      <div className={styles.footer}>
        {!loadingProducts && products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <button
            className={styles.seeMore}
            onClick={onSeeMore}
            disabled={!hasMore || loadingProducts}
          >
            {loadingProducts
              ? "Loading…"
              : hasMore
              ? "See More"
              : "No More Products"}
          </button>
        )}
      </div>
    </section>
  );
};

export default TopPicks;