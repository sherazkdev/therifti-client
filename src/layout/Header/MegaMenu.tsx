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
          className={`${styles.seeAll} ${
            !activeChild ? styles.active : ""
          }`}
          onMouseEnter={() => setActiveChild(null)}
          onClick={() => onCategoryClick(category.id)}
        >
          <LayoutGrid size={18} />
          <span>See all</span>
        </div>

        {/* SECOND LEVEL */}
        {category.children?.map((child) => {
          const Icon = child.icon;

          return (
            <div
              key={child.id}
              className={`${styles.secondItem} ${
                activeChild?.id === child.id ? styles.active : ""
              }`}
              onMouseEnter={() => setActiveChild(child)}
            >
              <div className={styles.leftItem}>
                {Icon && <Icon size={18} />}
                <span>{child.name}</span>
              </div>
              <ChevronRight size={16} />
            </div>
          );
        })}
      </div>

      {/* RIGHT SIDE (THIRD LEVEL) */}
      <div className={styles.right}>
        {activeChild?.children?.map((sub) => (
          <div
            key={sub.id}
            className={styles.thirdItem}
            onClick={() => onCategoryClick(sub.id)}
          >
            {sub.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;