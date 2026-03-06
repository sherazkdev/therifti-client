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

 

const navigate = useNavigate();


const handleCategoryClick = (id: string, Name?: string) => {

  console.log("CLICKED CATEGORY:", Name);

  if (onParentCategorySelect && Name) {
    onParentCategorySelect(Name);
  }


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