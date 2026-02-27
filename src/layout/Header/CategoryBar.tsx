//category bar option 
import styles from "./CategoryBar.module.css";
import { MapPin, Globe, ChevronDown } from "../../components/icons";

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

const CategoryBar = () => {
  return (
    <nav className={styles.categoryBar}>
      {/* LEFT: categories */}
      <ul className={styles.categoryList}>
        {categories.map((item) => (
          <li key={item} className={styles.categoryItem}>
            {item}
          </li>
        ))}
      </ul>

      {/* RIGHT: location + globe */}
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
