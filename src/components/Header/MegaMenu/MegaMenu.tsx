import { useState } from "react";
import styles from "./MegaMenu.module.css";
import * as Icons from "lucide-react";
import { type CategoryDocument } from "../../../types/api";
import type { MegaMenuPropsInterface } from "../../../types/components";
import CategoryIcon from "../../CategoryIcon/CategoryIcon";

const MegaMenu = ({ category, onCategoryClick }: MegaMenuPropsInterface) => {
  const [activeChild, setActiveChild] = useState<CategoryDocument | null>(
    category.children?.[0] || null
  );

  return (
    <div className={styles.menu}>
      {/* LEFT S_idE */}
      <div className={styles.left}>

        {/* SEE ALL */}
        <div
          className={`${styles.seeAll} ${!activeChild ? styles.active : ""}`}
          onMouseEnter={() => setActiveChild(null)}
          onClick={() => onCategoryClick(category._id)}
        >
          <Icons.LayoutGrid size={18} />
          <span>See all</span>
        </div>

        {/* SECOND LEVEL */}
        {category.children?.map((child) => {

          return (
            <div
              key={child._id}
              className={`${styles.secondItem} ${activeChild?._id === child._id ? styles.active : ""
                }`}
              onMouseEnter={() => setActiveChild(child)}
              onClick={() => onCategoryClick(child._id)}   
            >
              <div className={styles.leftItem}>
                <CategoryIcon category={child} size={18} />
                <span>{child.title}</span>
              </div>
              <Icons.ChevronRight size={16} />
            </div>
          );
        })}
      </div>

      {/* RIGHT S_idE (THIRD LEVEL) */}
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