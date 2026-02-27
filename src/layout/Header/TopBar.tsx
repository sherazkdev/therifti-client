// Page white bar here

import styles from "./Header.module.css";
import LogoIcon from "../../assets/icons/logo.png";
import SearchIcon from "../../assets/icons/search.png";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.topBar}>
      {/* LEFT SIDE */}
      <div className={styles.topLeft}>
        {/* Logo */}
        <img
          src={LogoIcon}
          alt="Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
        />

        {/* Search */}
        <div className={styles.searchWrapper}>
          <img src={SearchIcon} alt="Search" className={styles.searchIcon} />

          <input
            className={styles.searchInput}
            placeholder='Search in "Men & clothing & shirts"'
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.topRight}>
        <button
          type="button"
          className={styles.signIn}
          onClick={() => navigate("/login")}
        >
          <span className={styles.btnText}>Sign in</span>
          <MoveRight size={16} className={styles.btnIcon} />
        </button>

        <button
          type="button"
          className={styles.startSelling}
          onClick={() => navigate("/sell")}
        >
          Start Selling
        </button>
      </div>
    </div>
  );
};

export default TopBar;