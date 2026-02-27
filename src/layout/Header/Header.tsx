//wrapper for the whole navbar 

import CategoryBar from "./CategoryBar";
import styles from "./Topbar.module.css";
import Hero from "./Hero";
import TopBar from "./TopBar";


const Header = () => {
  return (
    <header className={styles.header}>
      <TopBar />
      <div className={styles.overlayArea}>
        <CategoryBar />
        <Hero />
      </div>
    </header>
  );
};

export default Header;
