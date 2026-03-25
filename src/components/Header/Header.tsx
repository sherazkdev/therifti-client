import TopBar from "./TopBar/TopBar";
import CategoryBar from "./CategoryBar/CategoryBar";
import styles from "./TopBar/Topbar.module.css";
import { categories } from "../../data/categories";
import type { CategoryDocument } from "../../types/api";
import { useNavigate } from "react-router-dom";
import type { HeaderPropsInterface } from "../../types/components/header.types";

const Header = ({
  variant = "overlay"
}: HeaderPropsInterface) => {

  const Redirect = useNavigate();


  const handleCategoryClick = (categoryId: string) => {
    Redirect(`/catalog?categoryId=${categoryId}`);
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