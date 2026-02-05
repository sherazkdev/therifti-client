//Page white bar here

import styles from "./Header.module.css";
import LogoIcon from "../../assets/icons/logo.png";
import SearchIcon from "../../assets/icons/search.png";

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      {/* LEFT SIDE */}
      <div className={styles.topLeft}>
        {/* Logo */}
        <img
          src={LogoIcon}
          alt="Logo"
          className={styles.logo}
        />

        {/* Search */}
        <div className={styles.searchWrapper}>
          <img
            src={SearchIcon}
            alt="Search"
            className={styles.searchIcon}
          />

          <input
            className={styles.searchInput}
            placeholder='Search in "Men & clothing & shirts"'
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.topRight}>
        <button className={styles.signIn}>Sign in →</button>
        <button className={styles.startSelling}>Start Selling</button>
      </div>
    </div>
  );
};

export default TopBar;
