import { useState } from "react";

/** Styles */
import styles from "../../TopPicks.module.css";
/** Icons */
import { ChevronDown } from "lucide-react";


type Drop = "category" | "price" | "size" | "sort" | null;

const Filter = () => {

    const [selectedPath, setSelectedPath] = useState<string>("All");
    const [open, setOpen] = useState<Drop>(null);

    const toggleOpen = (d:any) => {
        setOpen((prev) => (prev === d ? null : d));
        if (d !== "category") setCatStack([]);
    };
    return (
        <>
            <div className={styles.filters} ref={panelRef}>

                <button
                className={`${styles.pill} ${styles.allPill} ${selectedPath === "All" ? styles.pillActive : ""}`}
                type="button"
                onClick={async () => {
                    setSelectedPath("All");
                    setAppliedCategoryKey(null);
                    await fetchProductsWithCurrentFilters(1, "replace", { categoryKey: null });
                }}
                >
                All
                </button>

                {/* Category */}
                <div className={styles.dropWrap}>
                <button
                    className={`${styles.pill} ${open === "category" ? styles.pillOpen : ""}`}
                    type="button"
                    onClick={() => toggleOpen("category")}
                    title={selectedPath}
                >
                    {selectedPath === "All" ? "Category" : selectedPath} <ChevronDown size={16}/>
                </button>

                {open === "category" && (
                    <div className={styles.dropdown}>
                    {showRoot && (
                        <div className={styles.menuList}>
                        <div className={styles.ddHeader}>
                            Category{loadingCats ? " (Loading…)" : ""}
                        </div>

                        {categoryTree.map((c) => (
                            <button
                            key={c.key}
                            className={styles.menuItem}
                            type="button"
                            onClick={() => {
                                if (c.children && c.children.length) {
                                goIntoCategory(c.key);
                                } else {
                                void applyCategorySelection([c.key]);
                                }
                            }}
                            >
                            <span className={styles.menuLeft}>
                                <span className={styles.iconBox} aria-hidden="true">
                                <Shirt size={16} />
                                </span>
                                <span className={styles.menuLabel}>{c.label}</span>
                            </span>

                            <span className={styles.menuRight} aria-hidden="true">
                                {c.children && c.children.length ? "›" : ""}
                            </span>
                            </button>
                        ))}
                        </div>
                    )}

                    {showCategoryScreen && (
                        <div className={styles.menuScreen}>
                        <div className={styles.menuTop}>
                            <button
                            className={styles.backBtn}
                            type="button"
                            onClick={goBackCategory}
                            >
                            <ChevronLeft size={16} />
                            </button>

                            <div className={styles.menuTitle}>{currentCatNode?.label ?? "Category"}</div>

                            <button className={styles.applyBtn} type="button" onClick={() => void applyCategorySelection()}>
                            Apply
                            </button>
                        </div>

                        {currentCatNode?.children?.length ? (
                            <div className={styles.menuList}>
                            {currentCatNode.children.map((child) => (
                                <button
                                key={child.key}
                                className={styles.menuItem}
                                type="button"
                                onClick={() => goIntoCategory(child.key)}
                                >
                                <span className={styles.menuLeft}>
                                    <span className={styles.iconBox} aria-hidden="true">
                                    <Shirt size={16} />
                                    </span>
                                    <span className={styles.menuLabel}>{child.label}</span>
                                </span>
                                <span className={styles.menuRight} aria-hidden="true">
                                    ›
                                </span>
                                </button>
                            ))}
                            </div>
                        ) : (
                            <div className={styles.checkList}>
                            <div className={styles.ddSubHeader}>Choose options</div>

                            {(currentCatNode?.options ?? []).map((opt) => {
                                const groupKey = currentCatNode?.key ?? "unknown";
                                const checked = (selectedCatOptions[groupKey] ?? []).includes(opt);

                                return (
                                <button
                                    key={opt}
                                    type="button"
                                    className={styles.checkRow}
                                    onClick={() => toggleOption(groupKey, opt)}
                                >
                                    <span className={styles.checkText}>{opt}</span>

                                    <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                                    {checked ? "✓" : ""}
                                    </span>
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
                        <button className={styles.smallBtn} type="button" onClick={() => void applyNonCategoryFilters()}>
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
                    onClick={() => toggleOpen("size")}
                >
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
                            <span className={`${styles.rightBox} ${checked ? styles.rightBoxOn : ""}`}>
                                {checked ? "✓" : ""}
                            </span>
                            </button>
                        );
                        })}
                    </div>

                    <div className={styles.ddFooter}>
                        <button className={styles.smallBtn} type="button" onClick={() => void applyNonCategoryFilters()}>
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
                            onClick={async () => {
                            setSortValue(opt);
                            setOpen(null);
                            await fetchProductsWithCurrentFilters(1, "replace", { sort: opt });
                            }}
                        >
                            <span className={styles.menuLeft}>
                            <span className={styles.menuLabel}>{opt}</span>
                            </span>
                            <span className={`${styles.rightBox} ${sortValue === opt ? styles.rightBoxOn : ""}`} aria-hidden="true">
                            {sortValue === opt ? "✓" : ""}
                            </span>
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div>
        </>
    )
};

export default Filter;