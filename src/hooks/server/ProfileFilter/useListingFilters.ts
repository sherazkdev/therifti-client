import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import type { ProductSort } from "../../../types/api/product.types";

export const useListingFilters = () => {
  const { userId } = useParams();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [sort, setSort] = useState<ProductSort | null>(null);

  // ✅ MAIN PAYLOAD BUILDER
  const buildPayload = useCallback(() => {
    return {
      userId: userId!,
      page: 1,
      limit: 10,
      categoryId: categoryId || undefined,
      sort: sort || undefined,
    };
  }, [userId, categoryId, sort]);

  // ✅ CATEGORY CHANGE
  const handleCategoryChange = (value: string) => {
    const finalValue = value === "ALL" ? null : value;
    setCategoryId(finalValue);

    const payload = {
      userId: userId!,
      categoryId: finalValue || undefined,
      sort: sort || undefined,
    };

    console.log("CATEGORY PAYLOAD", payload);
  };

  // ✅ SORT CHANGE
  const handleSortChange = (value: string) => {
    const finalValue = value as ProductSort;
    setSort(finalValue);

    const payload = {
      userId: userId!,
      categoryId: categoryId || undefined,
      sort: finalValue,
    };

    console.log("SORT PAYLOAD", payload);
  };

  return {
    buildPayload,
    handleCategoryChange,
    handleSortChange,
  };
};