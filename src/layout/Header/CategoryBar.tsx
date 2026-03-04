import React, { useState } from "react";
import styles from "./CategoryBar.module.css";
import MegaMenu from "./MegaMenu";
import type { Category } from "../../types/category";

type Props = {
  categories: Category[];
  onCategoryClick: (id: string, parentName?: string) => void;
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
      {/* ================= PARENT CATEGORY LIST ================= */}
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={styles.categoryItem}
            onMouseEnter={() => setActive(cat)}
            onClick={() => onCategoryClick(cat.id, cat.name)}  //  Parent click
          >
            {cat.name}
          </li>
        ))}
      </ul>

      {/* ================= MEGA MENU ================= */}
      {active && (
        <MegaMenu
          category={active}
          onCategoryClick={(id) =>
            onCategoryClick(id, active.name)   // Pass parent name always
          }
        />
      )}
    </nav>
  );
};

export default CategoryBar;