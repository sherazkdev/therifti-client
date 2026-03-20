import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import type { ProductSort } from "../../../types/api/product.types";

export const useListingFilters = () => {
  const { userId } = useParams();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [sort, setSort] = useState<ProductSort | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // fixed for now

  // MAIN PAYLOAD BUILDER (single source of truth)
  const buildPayload = useCallback(() => {
    return {
      userId: userId!,
      page,
      limit,
      categoryId: categoryId || undefined,
      sort: sort || undefined,
    };
  }, [userId, page, limit, categoryId, sort]);

  //  CATEGORY CHANGE
  const handleCategoryChange = (value: string) => {
    const finalValue = value === "ALL" ? null : value;

    setCategoryId(finalValue);
    setPage(1); //  reset page on filter change

    const payload = {
      userId: userId!,
      page: 1,
      limit,
      categoryId: finalValue || undefined,
      sort: sort || undefined,
    };

    console.log("CATEGORY PAYLOAD", payload);
  };

  // SORT CHANGE
  const handleSortChange = (value: string) => {
    const finalValue = value as ProductSort;

    setSort(finalValue);
    setPage(1); 

    const payload = {
      userId: userId!,
      page: 1,
      limit,
      categoryId: categoryId || undefined,
      sort: finalValue,
    };

    console.log("SORT PAYLOAD", payload);
  };

  //  PAGINATION (future use)
  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const payload = {
      userId: userId!,
      page: newPage,
      limit,
      categoryId: categoryId || undefined,
      sort: sort || undefined,
    };

    console.log("PAGE PAYLOAD", payload);
  };

  return {
    buildPayload,
    handleCategoryChange,
    handleSortChange,
    handlePageChange, // future use
  };
};