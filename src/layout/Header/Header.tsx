import { useState } from "react";
import TopBar from "./TopBar";
import CategoryBar from "./CategoryBar";
import styles from "./Topbar.module.css";
import { categories } from "../../data/categories";
import type { Category } from "../../types/category";
import { useNavigate } from "react-router-dom";



type HeaderProps = {
  variant?: "overlay" | "solid";
  onParentCategorySelect?: (name: string) => void;
};

const Header = ({
  variant = "overlay",
  onParentCategorySelect
}: HeaderProps) => {

  const [selectedParent, setSelectedParent] = useState<string | null>(null);

const navigate = useNavigate();

// const handleCategoryClick = (id: string, name?: string) => {

//   const payload = {
//     categoryId: id,
//   };

//   console.log("Header Payload:", payload);

//   if (name) {
//     navigate(`/category/${name.toLowerCase()}`);
//   }
// };

const handleCategoryClick = (id: string, Name?: string) => {
  console.log("Header Payload:", { categoryId: id , itemName: Name || null});

  navigate(`/category/${id}`);
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