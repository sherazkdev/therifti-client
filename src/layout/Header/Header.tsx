//wrapper for the whole navbar 

import CategoryBar from "./CategoryBar";
import styles from "./Topbar.module.css";
import Hero from "./Hero";
import TopBar from "./TopBar";


type HeaderProps = {
  showHero?: boolean;
  category?: string;
};

const Header = ({ showHero = true, category }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <TopBar />

      <div className={styles.overlayArea}>
        <CategoryBar />

        {showHero && <Hero category={category} />}
      </div>
    </header>
  );
};

export default Header;
