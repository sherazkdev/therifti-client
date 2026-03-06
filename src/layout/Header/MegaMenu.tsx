import { useState } from "react";
import styles from "./MegaMenu.module.css";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { type Category } from "../../types/category";

type Props = {
  category: Category;
  onCategoryClick: (id: string) => void;
};

const MegaMenu = ({ category, onCategoryClick }: Props) => {
  const [activeChild, setActiveChild] = useState<Category | null>(
    category.children?.[0] || null
  );

  return (
    <div className={styles.menu}>
      {/* LEFT SIDE */}
      <div className={styles.left}>

        {/* SEE ALL */}
        <div
          className={`${styles.seeAll} ${!activeChild ? styles.active : ""}`}
          onMouseEnter={() => setActiveChild(null)}
          onClick={() => onCategoryClick(category._id)}
        >
          <LayoutGrid size={18} />
          <span>See all</span>
        </div>

        {/* SECOND LEVEL */}
        {category.children?.map((child) => (
          <div
            key={child._id}
            className={`${styles.secondItem} ${
              activeChild?._id === child._id ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveChild(child)}
            onClick={() => onCategoryClick(child._id)}
          >
            <div className={styles.leftItem}>
              {/* icon optional */}
              <span>{child.title}</span>
            </div>

            <ChevronRight size={16} />
          </div>
        ))}
      </div>

      {/* RIGHT SIDE (THIRD LEVEL) */}
      <div className={styles.right}>
        {activeChild?.children?.map((sub) => (
          <div
            key={sub._id}
            className={styles.thirdItem}
            onClick={() => onCategoryClick(sub._id)}
          >
            {sub.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;