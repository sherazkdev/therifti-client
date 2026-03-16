import { type FC, type RefObject } from "react";
import styles from "../Search.module.css"; 
import { ChevronDown, ChevronLeft, Shirt } from "lucide-react";
import type { CategoryDocument } from "../../../types/category/category.types";
import { CONDITION_OPTIONS } from "../../../data/condition";
import { COLOR_OPTIONS } from "../../../data/color"; 
// Hooks for dynamic data
import useSizesByCategory from "../../../hooks/server/size/useSizesByCategory";
import useBrandsByCategoryId from "../../../hooks/server/brand/useBrandsByCategory";
import useMaterialsByCategory from "../../../hooks/server/material/useMaterialsByCategory";

type Drop = "category" | "price" | "size" | "brand" | "material" | "condition" | "color" | "sort" | null;

type SearchFilterBarProps = {
  open: Drop;
  toggleOpen: (d: Drop) => void;
  selectedPath: string;
  categoryTree: CategoryDocument[];
  catStack: string[];
  currentCatNode: CategoryDocument | null;
  goIntoCategory: (key: string) => void;
  goBackCategory: () => void;
  applyCategorySelection: (explicitId?: string) => void;
  
  categoryId: string | null;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  selectedMaterials: string[];
  toggleMaterial: (material: string) => void;
  selectedConditions: string[];
  toggleCondition: (condition: string) => void;
  selectedColors: string[];
  toggleColor: (color: string) => void;
  
  priceFrom: string;
  setPriceFrom: (val: string) => void;
  priceTo: string;
  setPriceTo: (val: string) => void;
  
  sortValue: string;
  setSortValue: (val: any) => void;
  SORT_OPTIONS: string[];
  applyNonCategoryFilters: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
};

const SearchFilterBar: FC<SearchFilterBarProps> = ({
  open, toggleOpen, selectedPath, categoryTree, catStack, currentCatNode,
  goIntoCategory, goBackCategory, applyCategorySelection,
  categoryId, selectedSizes, toggleSize, selectedBrands, toggleBrand,
  selectedMaterials, toggleMaterial, selectedConditions, toggleCondition,
  selectedColors, toggleColor, priceFrom, setPriceFrom, priceTo, setPriceTo,
  sortValue, setSortValue, SORT_OPTIONS, applyNonCategoryFilters, panelRef
}) => {

  // Dynamic Fetches
  const { data: sizesData } = useSizesByCategory(categoryId || undefined);
  const { data: brandsData } = useBrandsByCategoryId(categoryId || undefined);
  const { data: materialsData } = useMaterialsByCategory(categoryId || undefined);

  const showRoot = open === "category" && catStack.length === 0;
  const showCategoryScreen = open === "category" && catStack.length > 0;

  // Reusable Dropdown Render Function for simple array lists (Size, Brand, Material, Color, Condition)
  const renderListDropdown = (title: string, dataArray: any[], selectedArray: string[], toggleFn: (val: string) => void, idKey: string, labelKey: string) => (
    <div className={styles.dropdown}>
      <div className={styles.ddHeader}>{title}</div>
      <div className={styles.sizeList}>
        {dataArray.length === 0 && <div style={{padding: "10px", fontSize:"13px", color:"#777"}}>No options available</div>}
        {dataArray.map((item: any) => {
          const value = item[idKey];
          const checked = selectedArray.includes(value);
          return (
            <button key={value} type="button" className={styles.sizeRow} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFn(value); }}>
              <span className={styles.sizeText}>{item[labelKey]}</span>
              <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>{checked ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.ddFooter}>
        <button className={styles.smallBtn} type="button" onClick={applyNonCategoryFilters}>Done</button>
      </div>
    </div>
  );

  return (
    <div className={styles.filters} ref={panelRef}>

      {/* 1. Category Dropdown */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "category" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("category")}>
          {selectedPath} <ChevronDown size={16} />
        </button>

        {open === "category" && (
          <div className={styles.dropdown}>
            {showRoot && (
              <div className={styles.menuList}>
                <div className={styles.ddHeader}>Category</div>
                {categoryTree.map((c) => (
                  <button key={c._id} className={styles.menuItem} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (c.children?.length) goIntoCategory(c._id); else applyCategorySelection(c._id); }}>
                    <span className={styles.menuLeft}>
                      <span className={styles.iconBox}><Shirt size={16} /></span>
                      <span className={styles.menuLabel}>{c.title}</span>
                    </span>
                    <span className={styles.menuRight}>{c.children?.length ? "›" : ""}</span>
                  </button>
                ))}
              </div>
            )}
            {showCategoryScreen && (
              <div className={styles.menuScreen}>
                <div className={styles.menuTop}>
                  <button className={styles.backBtn} type="button" onClick={goBackCategory}><ChevronLeft size={16} /></button>
                  <div className={styles.menuTitle}>{currentCatNode?.title ?? "Category"}</div>
                  <button className={styles.applyBtn} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); applyCategorySelection(); }}>Apply</button>
                </div>
                <div className={styles.menuList}>
                   {(currentCatNode?.children ?? []).map((child: any) => (
                      <button key={child._id} className={styles.menuItem} type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (child.children?.length) goIntoCategory(child._id); else applyCategorySelection(child._id); }}>
                        <span className={styles.menuLeft}>
                           <span className={styles.iconBox}><Shirt size={16} /></span>
                           <span className={styles.menuLabel}>{child.title}</span>
                        </span>
                        <span className={styles.menuRight}>{child.children?.length ? "›" : ""}</span>
                      </button>
                   ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Brand Dropdown (Dynamic) */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "brand" ? styles.pillOpen : ""}`} type="button" onClick={() => { if(!categoryId) alert("Select Category First!"); else toggleOpen("brand"); }}>
          Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`} <ChevronDown size={16} />
        </button>
        {open === "brand" && renderListDropdown("Brands", brandsData?.data ?? [], selectedBrands, toggleBrand, "_id", "brand")}
      </div>

      {/* 3. Size Dropdown (Dynamic) */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "size" ? styles.pillOpen : ""}`} type="button" onClick={() => { if(!categoryId) alert("Select Category First!"); else toggleOpen("size"); }}>
          Size {selectedSizes.length > 0 && `(${selectedSizes.length})`} <ChevronDown size={16} />
        </button>
        {open === "size" && renderListDropdown("Sizes", sizesData?.data ?? [], selectedSizes, toggleSize, "_id", "international")}
      </div>

      {/* 4. Material Dropdown (Dynamic) */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "material" ? styles.pillOpen : ""}`} type="button" onClick={() => { if(!categoryId) alert("Select Category First!"); else toggleOpen("material"); }}>
          Material {selectedMaterials.length > 0 && `(${selectedMaterials.length})`} <ChevronDown size={16} />
        </button>
        {open === "material" && renderListDropdown("Materials", materialsData?.data ?? [], selectedMaterials, toggleMaterial, "_id", "material")}
      </div>

      {/* 5. Condition Dropdown (Static) */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "condition" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("condition")}>
          Condition {selectedConditions.length > 0 && `(${selectedConditions.length})`} <ChevronDown size={16} />
        </button>
        {open === "condition" && renderListDropdown("Conditions", CONDITION_OPTIONS, selectedConditions, toggleCondition, "value", "label")}
      </div>

      {/* 6. Color Dropdown (Static) */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "color" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("color")}>
          Color {selectedColors.length > 0 && `(${selectedColors.length})`} <ChevronDown size={16} />
        </button>
        {open === "color" && renderListDropdown("Colors", COLOR_OPTIONS, selectedColors, toggleColor, "value", "label")}
      </div>

      {/* 7. Price */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "price" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("price")}>
          Price {(priceFrom || priceTo) && " (Set)"} <ChevronDown size={16} />
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
              <button className={styles.smallBtn} type="button" onClick={applyNonCategoryFilters}>Done</button>
            </div>
          </div>
        )}
      </div>

      {/* 8. Sort */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "sort" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("sort")}>
          Sort By <ChevronDown size={16} />
        </button>
        {open === "sort" && (
          <div className={styles.dropdown}>
            <div className={styles.ddHeader}>Sort</div>
            <div className={styles.menuList}>
              {SORT_OPTIONS.map((opt) => (
                <button key={opt} type="button" className={styles.menuItem} onClick={() => setSortValue(opt)}>
                  <span className={styles.menuLeft}><span className={styles.menuLabel}>{opt.replaceAll("_", " ")}</span></span>
                  <span className={`${styles.rightBox} ${sortValue === opt ? styles.rightBoxOn : ""}`}>{sortValue === opt ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchFilterBar;