import React, { useState } from "react";
import styles from "./CategoryFilter.module.css";
import type { CategoryDocument } from "../../types/api/category.types";

interface Props {
  categories: CategoryDocument[];
  onApply: (id: string | null) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, onApply }) => {
  const [stack, setStack] = useState<string[]>([]);
  const [activeList, setActiveList] = useState<CategoryDocument[]>(categories);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // go deeper
  const goNext = (cat: CategoryDocument) => {
    setStack((prev) => [...prev, cat._id]);
    setActiveList(cat.children || []);
  };

  // go back
  const goBack = () => {
    const newStack = stack.slice(0, -1);
    setStack(newStack);

    let list = categories;
    for (const id of newStack) {
      const found = list.find((c) => c._id === id);
      list = found?.children || [];
    }

    setActiveList(list);
  };

  return (
    <div className={styles.wrapper}>
      {/* ALL BUTTON */}
      <button
        className={styles.allBtn}
        onClick={() => {
          setSelectedId(null);
          onApply(null);
        }}
      >
        All
      </button>

      {/* BACK BUTTON */}
      {stack.length > 0 && (
        <button className={styles.backBtn} onClick={goBack}>
          ← Back
        </button>
      )}

      {/* CATEGORY LIST */}
      <div className={styles.list}>
        {activeList.map((cat) => (
          <button
            key={cat._id}
            className={styles.item}
            onClick={() => {
              if (cat.children?.length) {
                goNext(cat);
              } else {
                setSelectedId(cat._id);
              }
            }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* APPLY BUTTON */}
      <button
        className={styles.applyBtn}
        onClick={() => onApply(selectedId)}
        disabled={!selectedId}
      >
        Apply
      </button>
    </div>
  );
};

export default CategoryFilter;