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
          {/*TOGGLE yahn sy ho ga */}
        <CategoryBar variant={showHero ? "overlay" : "solid"} />

        {showHero && <Hero category={"men"} />}
      </div>
    </header>
  );
};

export default Header;
