import { type FC, useRef } from "react";
import styles from "../../TopPicks.module.css";
import { ChevronDown, ChevronLeft } from "lucide-react";
import CategoryIcon from "../../../CategoryIcon/CategoryIcon";

/** Hooks */
import useSizesByCategory from "../../../../hooks/server/size/useSizesByCategory";

/** Note: Types */
import type { TopPicksFiltersPropsInterface } from "../../../../types/components";

const FilterBar: FC<TopPicksFiltersPropsInterface> = ({
  open,
  toggleOpen,
  selectedPath,
  setSelectedPath,
  categoryTree,
  catStack,
  currentCatNode,
  goIntoCategory,
  goBackCategory,
  applyCategorySelection,
  selectedSizes,
  toggleSize,
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
  categoryId
}) => {

  const panelRef = useRef<HTMLDivElement>(null);

  const { data: sizesData } = useSizesByCategory(categoryId || undefined);

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
          applyCategorySelection();
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (c.children?.length) {
                        goIntoCategory(c._id);
                      } else {
                        applyCategorySelection(c._id);
                      }
                    }}
                  >
                    <span className={styles.menuLeft}>
                      <span className={styles.iconBox}>
                        <CategoryIcon category={c} size={16} />
                      </span>
                      <span className={styles.menuLabel}>{c.title}</span>
                    </span>

                    <span className={styles.menuRight}>
                      {c.children?.length ? "›" : ""}
                    </span>

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

                  <div className={styles.menuTitle}>
                    {currentCatNode?.title ?? "Category"}
                  </div>

                  <button
                    className={styles.applyBtn}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      const groupKey = currentCatNode?._id ?? "unknown";
                      const selected = selectedCatOptions[groupKey]?.[0];

                      applyCategorySelection(selected);
                    }}
                  >
                    Apply
                  </button>

                </div>

                {(() => {

                  const children = currentCatNode?.children ?? [];

                  const hasDeeperLevels = children.some(
                    (child: any) => child.children && child.children.length > 0
                  );

                  if (hasDeeperLevels) {

                    return (
                      <div className={styles.menuList}>

                        {children.map((child: any) => (

                          <button
                            key={child._id}
                            className={styles.menuItem}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              goIntoCategory(child._id);
                            }}
                          >

                            <span className={styles.menuLeft}>
                              <span className={styles.iconBox}>
                                <CategoryIcon category={child} size={16} />
                              </span>
                              <span className={styles.menuLabel}>{child.title}</span>
                            </span>

                            <span className={styles.menuRight}>›</span>

                          </button>

                        ))}

                      </div>
                    );

                  } else {

                    return (
                      <div className={styles.checkList}>

                        <div className={styles.ddSubHeader}>Choose options</div>

                        {children.map((opt: any) => {

                          const groupKey = currentCatNode?._id ?? "unknown";
                          const checked = (selectedCatOptions[groupKey] ?? []).includes(opt._id);

                          return (

                            <button
                              key={opt._id}
                              type="button"
                              className={styles.checkRow}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                toggleOption(groupKey, opt._id);
                              }}
                            >

                              <span className={styles.checkText}>{opt.title}</span>

                              <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                                {checked ? "✓" : ""}
                              </span>

                            </button>

                          );

                        })}

                      </div>
                    );

                  }

                })()}

              </div>
            )}

          </div>
        )}
      </div>

      {/* Price */}

      <div className={styles.dropWrap}>

        <button
          className={`${styles.pill} ${open === "price" ? styles.pillOpen : ""}`}
          type="button"
          onClick={() => toggleOpen("price")}
        >
          Price <ChevronDown size={16} />
        </button>

        {open === "price" && (
          <div className={styles.dropdown}>

            <div className={styles.ddHeader}>Price Range</div>

            <div className={styles.priceBox}>

              <div className={styles.priceField}>
                <label className={styles.priceLabel}>From</label>
                <input
                  className={styles.priceInput}
                  placeholder="0$"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
              </div>

              <div className={styles.priceField}>
                <label className={styles.priceLabel}>To</label>
                <input
                  className={styles.priceInput}
                  placeholder="999$"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>

            </div>

            <div className={styles.ddFooter}>
              <button
                className={styles.smallBtn}
                type="button"
                onClick={applyNonCategoryFilters}
              >
                Done
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Size */}

      <div className={styles.dropWrap}>

        <button
          className={`${styles.pill} ${open === "size" ? styles.pillOpen : ""}`}
          type="button"
          onClick={(e) => {

            e.preventDefault();
            e.stopPropagation();

            if (!categoryId) {
              alert("Please select category first");
              return;
            }

            toggleOpen("size");

          }}
        >
          Size <ChevronDown size={16} />
        </button>

        {open === "size" && (
          <div className={styles.dropdown}>

            <div className={styles.ddHeader}>Sizes</div>

            <div className={styles.sizeList}>

              {(sizesData?.data ?? []).map((s: any) => {

                const checked = selectedSizes.includes(s._id);

                return (

                  <button
                    key={s._id}
                    type="button"
                    className={styles.sizeRow}
                    onClick={(e) => {

                      e.preventDefault();
                      e.stopPropagation();

                      toggleSize(s._id);

                    }}
                  >

                    <span className={styles.sizeText}>
                      {s.international}
                    </span>

                    <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                      {checked ? "✓" : ""}
                    </span>

                  </button>

                );

              })}

            </div>

            <div className={styles.ddFooter}>
              <button
                className={styles.smallBtn}
                type="button"
                onClick={applyNonCategoryFilters}
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Sort */}

      <div className={styles.dropWrap}>

        <button
          className={`${styles.pill} ${open === "sort" ? styles.pillOpen : ""}`}
          type="button"
          onClick={() => toggleOpen("sort")}
        >
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

                  <span className={`${styles.rightBox} ${sortValue === opt ? styles.rightBoxOn : ""}`}>
                    {sortValue === opt ? "✓" : ""}
                  </span>

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