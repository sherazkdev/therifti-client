import React, { useState } from "react";
import styles from "./CategoryBar.module.css";
import MegaMenu from "../MegaMenu/MegaMenu";
import { MapPin, Globe } from "lucide-react";
import type { CategoryDocument } from "../../../types/api";
import type { CategoryPropsInterface } from "../../../types/components";
import { useNavigate } from "react-router-dom";

const CategoryBar: React.FC<CategoryPropsInterface> = ({
  categories,
  variant = "overlay",
}) => {
  const [active, setActive] = useState<CategoryDocument | null>(null);
  const navigate = useNavigate(); // ADD

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
            key={cat._id}
            className={styles.categoryItem}
            onMouseEnter={() => setActive(cat)}
            onClick={() => {
              // ✅ URL NAVIGATION
              navigate(`/catalog?category=${cat._id}`);
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
          onCategoryClick={(_id: string) => {
            // yahan bhi URL change
            navigate(`/search?category=${_id}`);
            setActive(null);
          }}
        />
      )}
    </nav>
  );
};

export default CategoryBar;