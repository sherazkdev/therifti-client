import { type FC, useRef } from "react";
import styles from "../../TopPicks.module.css";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Shirt } from "lucide-react";
import type { CategoryDocument } from "../../../../types/category/category.types";

export type Drop = "category" | "price" | "size" | "sort" | null;

type TopPicksFiltersProps = {
  open: Drop;
  toggleOpen: (d: Drop) => void;
  selectedPath: string;
  setSelectedPath: (val: string) => void;
  categoryTree: CategoryDocument[];
  catStack: string[];
  setCatStack: (stack: string[]) => void;
  currentCatNode: CategoryDocument | null;
  goIntoCategory: (key: string) => void;
  goBackCategory: () => void;
  applyCategorySelection: (stack?: string[]) => void;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  SIZE_OPTIONS: string[];
  sortValue: string;
  setSortValue: (val: string) => void;
  SORT_OPTIONS: string[];
  priceFrom: string;
  setPriceFrom: (val: string) => void;
  priceTo: string;
  setPriceTo: (val: string) => void;
  applyNonCategoryFilters: () => void;
  selectedCatOptions: Record<string, string[]>;
  toggleOption: (groupKey: string, option: string) => void;
  loadingCats: boolean;
};

const FilterBar: FC<TopPicksFiltersProps> = ({
  open,
  toggleOpen,
  selectedPath,
  setSelectedPath,
  categoryTree,
  catStack,
  setCatStack,
  currentCatNode,
  goIntoCategory,
  goBackCategory,
  applyCategorySelection,
  selectedSizes,
  toggleSize,
  SIZE_OPTIONS,
  sortValue,
  setSortValue,
  SORT_OPTIONS,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  applyNonCategoryFilters,
  selectedCatOptions,
  toggleOption,
  loadingCats,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const showRoot = open === "category" && catStack.length === 0;
  const showCategoryScreen = open === "category" && catStack.length > 0;

  return (
    <div className={styles.filters} ref={panelRef}>
      {/* All Button */}
      <button
        className={`${styles.pill} ${styles.allPill} ${selectedPath === "All" ? styles.pillActive : ""}`}
        type="button"
        onClick={() => {
          setSelectedPath("All");
          applyCategorySelection([]);
        }}
      >
        All
      </button>

      {/* Category Dropdown */}
      <div className={styles.dropWrap}>
        <button
          className={`${styles.pill} ${open === "category" ? styles.pillOpen : ""}`}
          type="button"
          onClick={() => toggleOpen("category")}
          title={selectedPath}
        >
          {selectedPath === "All" ? "Category" : selectedPath} <ChevronDown size={16} />
        </button>

        {open === "category" && (
          <div className={styles.dropdown}>
            {showRoot && (
              <div className={styles.menuList}>
                <div className={styles.ddHeader}>Category{loadingCats ? " (Loading…)" : ""}</div>
                {categoryTree.map((c) => (
                  <button
                    key={c._id}
                    className={styles.menuItem}
                    type="button"
                    onClick={() => (c.children?.length ? goIntoCategory(c._id) : applyCategorySelection([c._id]))}
                  >
                    <span className={styles.menuLeft}>
                      <span className={styles.iconBox} aria-hidden="true">
                        <Shirt size={16} />
                      </span>
                      <span className={styles.menuLabel}>{c.title}</span>
                    </span>
                    <span className={styles.menuRight} aria-hidden="true">{c.children?.length ? "›" : ""}</span>
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
                  <div className={styles.menuTitle}>{currentCatNode?.title ?? "Category"}</div>
                  <button className={styles.applyBtn} type="button" onClick={() => applyCategorySelection()}>
                    Apply
                  </button>
                </div>

                {currentCatNode?.children?.length ? (
                  <div className={styles.menuList}>
                    {currentCatNode.children.map((child:any) => (
                      <button
                        key={child._id}
                        className={styles.menuItem}
                        type="button"
                        onClick={() => goIntoCategory(child._id)}
                      >
                        <span className={styles.menuLeft}>
                          <span className={styles.iconBox} aria-hidden="true">
                            <Shirt size={16} />
                          </span>
                          <span className={styles.menuLabel}>{child.title}</span>
                        </span>
                        <span className={styles.menuRight} aria-hidden="true">›</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={styles.checkList}>
                    <div className={styles.ddSubHeader}>Choose options</div>
                    {(currentCatNode?.children ?? []).map((opt:any) => {
                      const groupKey = currentCatNode?._id ?? "unknown";
                      const checked = (selectedCatOptions[groupKey] ?? []).includes(opt.title);
                      return (
                        <button key={opt._id} type="button" className={styles.checkRow} onClick={() => toggleOption(groupKey, opt._id)}>
                          <span className={styles.checkText}>{opt.title}</span>
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

      {/* Price, Size, Sort – keep similar structure as above, use toggleOpen & applyNonCategoryFilters */}
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
              <button className={styles.smallBtn} type="button" onClick={applyNonCategoryFilters}>Done</button>
            </div>
          </div>
        )}
      </div>

      {/* Size */}
      <div className={styles.dropWrap}>
        <button className={`${styles.pill} ${open === "size" ? styles.pillOpen : ""}`} type="button" onClick={() => toggleOpen("size")}>
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
                    <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>{checked ? "✓" : ""}</span>
                  </button>
                );
              })}
            </div>
            <div className={styles.ddFooter}>
              <button className={styles.smallBtn} type="button" onClick={applyNonCategoryFilters}>Done</button>
            </div>
          </div>
        )}
      </div>

      {/* Sort */}
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
                  onClick={() => setSortValue(opt)}
                >
                  <span className={styles.menuLeft}>
                    <span className={styles.menuLabel}>{opt}</span>
                  </span>
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

export default FilterBar;