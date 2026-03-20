import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Types */
import type { HeroPropsInterface } from "../../types/components";

import bannerImg1 from "../../assets/images/Herobanner/HeroSection.png";
import bannerImg2 from "../../assets/images/Herobanner/Desktop - 59.png";
import bannerImg3 from "../../assets/images/Herobanner/Desktop - 60.png";
import bannerImg4 from "../../assets/images/SingleProduct/Desktop - 59.png";


const slides = [
  {
    image: bannerImg1,
    title: "Buy & Sell Pre-Loved Fashion & More",
    subtitle: "Peer-to-peer marketplace where you can shop or list instantly",
  },
  {
    image: bannerImg2,
    title: "Discover Unique Finds Every Day",
    subtitle: "Millions of second-hand items waiting for you",
  },
  {
    image: bannerImg3,
    title: "Sell What You Don’t Wear",
    subtitle: "Upload your items and earn in minutes",
  },
];

const Hero: React.FC<HeroPropsInterface> = ({ category }) => {
  const [active, setActive] = useState(0);

  // Slider only runs when NO category selected
  useEffect(() => {
    if (category) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [category]);

  // Reset slide when category changes
  useEffect(() => {
    if (category) {
      setActive(0);
    }
  }, [category]);

  const goPrev = () => {
    setActive((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className={styles.hero}>
      {/* ================= CATEGORY HERO ================= */}
      {category ? (
        <>
          <div
            className={`${styles.heroBg} ${styles.activeSlide}`}
            style={{ backgroundImage: `url(${bannerImg4})` }}
          />

          <div className={styles.heroOverlay}>
            <h1>
              {`${category.charAt(0).toUpperCase() + category.slice(1)} Collection`}
            </h1>
          </div>
        </>
      ) : (
        <>
          {/* ================= HOME SLIDER ================= */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.heroBg} ${
                index === active ? styles.activeSlide : ""
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}

          <div key={active} className={styles.heroOverlay}>
            <h1>{slides[active].title}</h1>
            <p>{slides[active].subtitle}</p>

            <button className={styles.heroBtn}>
              Sell Now
              <span className={styles.heroBtnArrow}>
                <ChevronRight size={13} />
              </span>
            </button>
          </div>

          <button
            aria-label="Previous slide"
            onClick={goPrev}
            className={`${styles.heroArrow} ${styles.left}`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            aria-label="Next slide"
            onClick={goNext}
            className={`${styles.heroArrow} ${styles.right}`}
          >
            <ChevronRight size={20} />
          </button>

          <div className={styles.heroDots}>
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActive(idx)}
                className={`${styles.dot} ${
                  idx === active ? styles.activeDot : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;