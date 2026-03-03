import React, { useState } from "react";
import styles from "./CategoryBar.module.css";
import MegaMenu from "./MegaMenu";
import type { Category } from "../../types/category";

type Props = {
  categories: Category[];
  onCategoryClick: (id: string, name?: string) => void;
  variant?: "overlay" | "solid";
};

const CategoryBar: React.FC<Props> = ({
  categories,
  onCategoryClick,
  variant = "overlay",
}) => {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <nav
      className={`${styles.categoryBar} ${
        variant === "solid" ? styles.solid : styles.overlay
      }`}
      onMouseLeave={() => setActive(null)}
    >
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={styles.categoryItem}
            onMouseEnter={() => setActive(cat)}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      {active && (
        <MegaMenu
          category={active}
          onCategoryClick={(id) => onCategoryClick(id, active?.name)}
        />
      )}
    </nav>
  );
};

export default CategoryBar;