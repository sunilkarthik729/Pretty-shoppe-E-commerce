import React from "react";
import styles from "./About.module.css";
import heroImage from "../assets/AboutBanner1.png";
import missionImage from "../assets/AboutBanner.png";

interface Aboutprops {
  theme: "light" | "dark";
}


const About: React.FC<Aboutprops> = ({theme}) => {
  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}><main className={styles.aboutPage}>
      { /* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>Welcome to THE PRETTY SHOPPE</h1>
          <p>
            Elevating your style with premium outfits and timeless designs ✨
          </p>
        </div>
        <img src={heroImage} alt="Hero" className={styles.heroImage} />
      </section>

      {/* Our Story Section */}
      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Our Story</h2>
          <p>
            THE PRETTY SHOPPE started with a vision to bring elegance, style, and
            quality into everyday fashion. We believe in creating outfits that
            make you feel confident and unique.
          </p>
        </div>
        <div className={styles.storyImage}>
          <img src={missionImage} alt="Mission" />
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>Quality</h3>
            <p>Premium fabrics, perfect stitching, attention to detail.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Innovation</h3>
            <p>Trendy designs, keeping you ahead in fashion world.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Sustainability</h3>
            <p>Eco-friendly processes & ethical sourcing practices.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Discover Your Style</h2>
        <p>Explore our handpicked collection for men and women today.</p>
        <button onClick={() => window.location.href="/Allproducts"}>Shop Now</button>
      </section>
    </main></div>
    
  );
};

export default About;
