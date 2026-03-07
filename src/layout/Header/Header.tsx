import { useState } from "react";
import TopBar from "../../components/Header/TopBar/TopBar";
import CategoryBar from "../../components/Header/Category/CategoryBar";
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

 

const navigate = useNavigate();
const handleCategoryClick = (id: string, Name?: string) => {

  console.log("CLICKED CATEGORY:", Name  , " ID = " , id);

  if (onParentCategorySelect && Name) {
    onParentCategorySelect(Name);
  }


};

  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.overlayArea}>
        <CategoryBar
          categories={categories}
          onCategoryClick={handleCategoryClick}
          variant={variant}
        />
      </div>
    </header>
  );
};

export default Header;