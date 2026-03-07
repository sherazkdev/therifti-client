import { useState, useEffect, useRef } from "react";

/** Types */
import type {CategoryDropDownProps} from "./CategoryDropdown.types";
import type { CategoryDocument } from "../../../../types/category/category.types";

/** Categories dummy data */
import { categories } from "../../../../data/categories";

/** Styles */
import styles from "./CategoryDropdown.module.css";
import { ChevronDown, ChevronLeft, ChevronRight, TextSelect } from "lucide-react";

const CategoryDropdown = ({ onSelectCategory }: CategoryDropDownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  // FULL selected path
  const [path, setPath] = useState<CategoryDocument[]>([]);

  // items currently visible in menu
  const [currentItems, setCurrentItems] = useState<CategoryDocument[]>(categories);

  // depth of currentItems
  const [currentDepth, setCurrentDepth] = useState(0);

  /* -------- CLOSE ON OUTSIDE CLICK -------- */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* -------- RESET MENU ON OPEN -------- */
  useEffect(() => {
    if (!open) return;

    if (path.length === 0) {
      setCurrentItems(categories);
      setCurrentDepth(0);
      return;
    }

    const parent = path.length > 1 ? path[path.length - 2] : null;

    setCurrentItems(parent?.children || categories);
    setCurrentDepth(path.length - 1);
  }, [open]);

  useEffect( () => {
    console.log("paht",path)
  },[path])

  /* -------- SELECT -------- */

  const handleSelect = (item: CategoryDocument) => {
    const newPath = [...path.slice(0, currentDepth), item];

    if (item.children && item.children.length) {
      setPath(newPath);
      setCurrentItems(item.children);
      setCurrentDepth(currentDepth + 1);
    } else {
      setPath(newPath);
      
     
      console.log("Selected Category ID:", item._id);
    
      onSelectCategory({
        path: newPath.map((p) => p.title),
      });
      setOpen(false);
    }
  };

  /* -------- BACK -------- */

  const handleBack = () => {
    const newDepth = currentDepth - 1;
    const newPath = path.slice(0, newDepth);

    setPath(newPath);
    setCurrentDepth(newDepth);

    if (newDepth === 0) {
      setCurrentItems(categories);
    } else {
      setCurrentItems(newPath[newDepth - 1].children || []);
    }
  };

  const displayValue =
    path.length > 0 ? path.map((p) => p.title).join(" → ") : "Select Category";

  return (
    <div className={styles.wrapper} ref={ref}>
      <label className={styles.label}>Category</label>

      <div className={styles.display} onClick={() => setOpen((p) => !p)}>
        <span>{displayValue}</span>
        <ChevronDown size={18} />
      </div>

      {open && (
        <div className={styles.menu}>
          {/* HEADER */}
          {currentDepth === 0 && (
            <div className={styles.menuHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.iconBox}>
                  <TextSelect size={16} />
                </span>
                <span>Select a category</span>
              </div>
            </div>
          )}

          {/* BACK */}
          {currentDepth > 0 && (
            <div className={styles.back} onClick={handleBack}>
              <div className={styles.headerLeft}>
                <span className={styles.iconBox}>
                  <ChevronLeft size={18} />
                </span>
                <span>{path[currentDepth - 1].title}</span>
              </div>
            </div>
          )}

          {/* OPTIONS */}
          {currentItems.map((item) => (
            <div
              key={item._id}
              className={styles.option}
              onClick={() => handleSelect(item)}
            >
              <div className={styles.left}>
                <span className={styles.iconBox}>⬚</span>
                {item.title}
              </div>

              {item.children && <ChevronRight size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};