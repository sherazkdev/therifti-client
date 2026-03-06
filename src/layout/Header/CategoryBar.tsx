import React, { useState } from "react";
import styles from "./CategoryBar.module.css";
import MegaMenu from "./MegaMenu";
import type { Category } from "../../types/category";
import { MapPin, Globe } from "lucide-react";

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
      {/* LEFT SIDE CATEGORY LIST */}
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={styles.categoryItem}
            onMouseEnter={() => setActive(cat)}
            onClick={() => {
              onCategoryClick(cat.id, cat.title); 
              setActive(null);
            }}
          >
            {cat.title}
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE */}
      <div className={styles.categoryRight}>
        <div className={styles.location}>
          <MapPin size={16} />
          <span>Rio, Brazil</span>
        </div>

        <button className={styles.iconBtn}>
          <Globe size={16} />
        </button>
      </div>

      {/* MEGA MENU */}
      {active && (
        <MegaMenu
          category={active}
          onCategoryClick={(id) => {
            onCategoryClick(id, active.title); 
            setActive(null);
          }}
        />
      )}
    </nav>
  );
};

export default CategoryBar;