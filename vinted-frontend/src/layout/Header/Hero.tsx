// In this files we have the content changing based upon the coming data 

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { MoveLeft, MoveRight } from "../../components/icons";
import bannerImg1 from "../../assets/images/Herobanner/HeroSection.png"
import bannerImg2 from "../../assets/images/Herobanner/Desktop - 59.png";
import bannerImg3 from "../../assets/images/Herobanner/Desktop - 60.png"


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



const Hero = () => {
  const [active, setActive] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

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
      {/* Background */}
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: slides[active].image
            ? `url(${slides[active].image})`
            : undefined,
        }}
      />

      {/* Center Content */}
      <div className={styles.heroOverlay}>
        <h1>{slides[active].title}</h1>
        <p>{slides[active].subtitle}</p>

        <button className={styles.heroBtn}>
          Sell Now
          <span className={styles.heroBtnArrow}>
            <MoveRight size={13} />
          </span>
        </button>
      </div>

      {/* LEFT */}
      <button
        aria-label="Previous slide"
        onClick={goPrev}
        className={`${styles.heroArrow} ${styles.left}`}
      >
        <MoveLeft size={20} />
      </button>

      {/* RIGHT */}
      <button
        aria-label="Next slide"
        onClick={goNext}
        className={`${styles.heroArrow} ${styles.right}`}
      >
        <MoveRight size={20} />
      </button>

      {/* Dots */}
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
    </section>
  );
};

export default Hero;
