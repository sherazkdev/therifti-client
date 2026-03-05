import { useState } from "react";
import TopBar from "./TopBar/TopBar";
import CategoryBar from "./Category/CategoryBar";
import styles from "./TopBar/Topbar.module.css";
import { categories } from "../../data/categories";
import type { Category } from "../../types/category";
import { useNavigate } from "react-router-dom";
import type { HeaderPropsInterface } from "./Header.types";

const Header = ({
  variant = "overlay"
}: HeaderPropsInterface) => {

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