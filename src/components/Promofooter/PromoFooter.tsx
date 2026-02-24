import styles from "./PromoFooter.module.css";
import { MoveRight } from "../../components/icons";
import promoImg from "../../assets/images/Footer/PromoFooter.svg";

const PromoFooter = () => {
  return (
    <section className={styles.wrapper}>
      {/* IMAGE BACKGROUND */}
      <div
        className={styles.imageLayer}
        style={{
          backgroundImage: `url(${promoImg})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className={styles.overlay} />

      {/* SHARED WIDTH CONTAINER */}
      <div className={styles.inner}>
        {/* CONTENT */}
        <div className={styles.content}>
          <h2>Make Your Wardrobe Digital</h2>

          <p>
            Enjoy the convenience of having your wardrobe at your
            fingertips and effortlessly elevate your style.
          </p>

          <button className={styles.cta}>
            Become a Seller
            <span className={styles.iconCircle}>
              <MoveRight color="white" size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoFooter;
