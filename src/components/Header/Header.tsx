import { useState } from "react";
import TopBar from "./TopBar/TopBar";
import CategoryBar from "./Category/CategoryBar";
import styles from "./TopBar/Topbar.module.css";
import { categories } from "../../data/categories";
import type { CategoryDocument } from "../../types/api";
import { useNavigate } from "react-router-dom";
import type { HeaderPropsInterface } from "../../types/components/header.types";

const Header = ({
  variant = "overlay"
}: HeaderPropsInterface) => {

  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const navigate = useNavigate();


  const handleCategoryClick = (id: string, Name?: string) => {
    console.log("Header Payload:", { categoryId: id , itemName: Name || null});
    navigate(`/category/${id}`);
  };

  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.overlayArea}>
        <CategoryBar
          categories={categories as CategoryDocument[]}
          onCategoryClick={handleCategoryClick}
          variant={variant}
        />
      </div>
    </header>
  );
};

export default Header;