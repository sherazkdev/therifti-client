import { useState } from "react";
import styles from "./FeaturedCategories.module.css";

import accessories from "../../assets/images/FeatureCategory/accessories.svg";
import women from "../../assets/images/FeatureCategory/women.svg";
import electronics from "../../assets/images/FeatureCategory/electronics.svg";
import kid from "../../assets/images/FeatureCategory/kid.svg";
import men from "../../assets/images/FeatureCategory/men.png";
import sport from "../../assets/images/FeatureCategory/sport.svg";
import entertainment from "../../assets/images/FeatureCategory/sport.svg";
import platform from "../../assets/images/FeatureCategory/sport.svg";
import { MoveRight } from "../../assets/icons/svgs/svg"; 

type FeaturedCard = {
  title: string;
  subtitle: string;
  image: string;
  cta?: boolean;
};

const baseCards: FeaturedCard[] = [
  {
    title: "Men",
    subtitle: "Essential Oversize T-Shirts",
    image: men,
    cta: true,
  },
  {
    title: "Women",
    subtitle: "Essential T-Shirts",
    image: women,
  },
  {
    title: "Kids",
    subtitle: "North Hand X BNDG",
    image: kid,
  },
  {
    title: "Electronics",
    subtitle: "North Hand X Balsamic",
    image: electronics,
  },
  {
    title: "Accessories",
    subtitle: "Essential Bucket Hat",
    image: accessories,
  },
  {
    title: "Sports",
    subtitle: "Base Camp Slide III Ltd. X Adidas",
    image: sport,
  },
];

const extraCards: FeaturedCard[] = [
  {
    title: "Entertainment",
    subtitle: "Music, movies & more",
    image: entertainment,
  },
  {
    title: "Our Platform",
    subtitle: "Community marketplace",
    image: platform,
  },
];

const FeaturedCategories = () => {
  const [showAll, setShowAll] = useState(false);

  const cards = showAll ? [...baseCards, ...extraCards] : baseCards;

  const getCardClass = (title: string) => {
    const isBig = title === "Men" || title === "Sports";
    const isHalfOnViewAll =
      showAll && (title === "Entertainment" || title === "Our Platform");

    return [
      styles.card,
      isBig ? styles.cardSpan2 : "",
      isHalfOnViewAll ? styles.cardSpan2 : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <section className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Featured Categories</h2>

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className={styles.viewAll}
          type="button"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {cards.map((item) => (
          <div key={item.title} className={getCardClass(item.title)}>
            <img src={item.image} alt={item.title} />

            <div className={styles.overlay}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.subtitle}>{item.subtitle}</span>

              {item.cta && (
                <button className={styles.shopBtn} type="button">
                  Shop Now <MoveRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
