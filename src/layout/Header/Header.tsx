import { useState } from "react";
import TopBar from "./TopBar";
import CategoryBar from "./CategoryBar";
import styles from "./Topbar.module.css";
import { categories } from "../../data/categories";
import type { Category } from "../../types/category";

type HeaderProps = {
  variant?: "overlay" | "solid";
  onParentCategorySelect?: (name: string) => void;
};

const Header = ({ 
  variant = "overlay",
  onParentCategorySelect
}: HeaderProps) => {

  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    const parent = categories.find(cat => cat.id === id);

    if (parent) {
      setSelectedParent(parent.name);
      onParentCategorySelect?.(parent.name);
    }

    const payload = {
      categoryId: id,
    };

    console.log("Header Payload:", payload);
  };

  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.overlayArea}>
        <CategoryBar
          categories={categories as Category[]}
          onCategoryClick={handleCategoryClick}
          variant={variant}
        />
      </div>
    </header>
  );
};

export default Header;