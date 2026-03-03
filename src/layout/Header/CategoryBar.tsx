// CategoryBar.tsx
import styles from "./CategoryBar.module.css";
import { MapPin, Globe, ChevronDown } from "../../components/icons";

type CategoryBarProps = {
  variant?: "overlay" | "solid";
};

const categories = [
  "Women",
  "Men",
  "Kids",
  "Collections",
  "Electronics",
  "Sports",
  "Entertainment",
  "Accessories",
  "Our Platform",
];

const CategoryBar = ({ variant = "overlay" }: CategoryBarProps) => {
  return (
    <nav
      className={`${styles.categoryBar} ${
        variant === "solid" ? styles.solid : styles.overlay
      }`}
    >
      <ul className={styles.categoryList}>
        {categories.map((item) => (
          <li key={item} className={styles.categoryItem}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.categoryRight}>
        <div className={styles.location}>
          <MapPin size={14} />
          <span>Rio, Brazil</span>
          <ChevronDown size={14} />
        </div>

        <button className={styles.iconBtn}>
          <Globe size={16} />
        </button>
      </div>
    </nav>
  );
};

export default CategoryBar;