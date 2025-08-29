import { data, Link, useNavigate } from "react-router-dom";
import fallbackimage from "../assets/prettyshoppe@inc.png";
import fallbackimage2 from "../assets/Menbanner.png";
import styles from "./Home.module.css";
import "./Home.module.css";

import { useEffect, useRef, useState } from "react";
import ContactUs from "../components/ContactUs";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import Faq from "../components/faqData";


interface HomeProps  {
  theme: "light" | "dark";
};

const Home: React.FC<HomeProps>  = ({theme}) => {
  const navigate = useNavigate();
  const contactRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [products, setProducts] = useState<Product[]>([]);

  const bestSellers = products.filter((p) => p.bestSeller);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  console.log(data, products);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <div className={styles.banner}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          poster={fallbackimage} // optional: in case video fails to load
        >
          <source src="/videos/prettyshoppe@inc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        Overlay text + button
        <div className={styles.overlay}>
          <h1>Elevate your Style</h1>
          <p>
            Discover the perfect outfit that blend style with durability.
            Explore our handpicked collection for men and women.
          </p>
          <button className={styles.shopBtn}>Shop Now</button>
        </div>
      </div>

      {/* About Preview Section */}
      <section className={styles.aboutPreview}>
        <div className={styles.content}>
          <h2 className={styles.title}>About</h2>
          <p className={styles.text}>
            Fashion that defines elegance ✨ <br />
            <strong>THE PRETTY SHOPPE</strong> OWN is our private label – that’s
            designed by us, and owned by you. If you’re looking for head-turning
            styles that are one-of-a-kind, THE PRETTY SHOPPE OWN is what you
            should stock up on.
          </p>
          <Link to={"/About"}>
            <button className={styles.learnBtn}>Learn More</button>
          </Link>
        </div>

        <div className={styles.imageBox}>
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            poster={fallbackimage2} // optional: in case video fails to load
          >
            {" "}
            <source src="/videos/Menbannervideo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section>
        <div className={styles.bestSeller}>
          <h2>Best Seller</h2>
        </div>

        <div
          className={isMobile ? styles.carousel : styles.ProductCardContainer}
        >
          {products.slice(6, 10).map((item) => {
            return (
              <div>
                <div className="product-grid">
                  <ProductCard
                    id={item.id}
                    bestSeller={item.bestSeller}
                    category={item.category}
                    description={item.description}
                    discount={item.discount}
                    finalPrice={item.finalPrice}
                    image={item.image}
                    previewImage={item.previewImage}
                    price={item.price}
                    rating={item.rating}
                    title={item.title}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <h2>Sections</h2>
      <section className={styles.collectionsSection}>
        <div className={styles.collectionCard}>
          <div className={`${styles.collectionImg} ${styles.menImg}`}></div>
          <div className={styles.collectionContent}>
            <h2>Men's Collection</h2>
            <p>
              Explore the finest styles curated for men. Premium outfits with a
              modern touch.
            </p>
            <button onClick={()=>{navigate("/Allproducts")}} className={styles.exploreBtn}>Explore Now</button>
          </div>
        </div>

        <div className={styles.collectionCard}>
          <div className={`${styles.collectionImg} ${styles.womenImg}`}></div>
          <div className={styles.collectionContent}>
            <h2>Women's Collection</h2>
            <p>
              Discover timeless designs for women. Trendy & classy outfits for
              every occasion.
            </p>
            <button onClick={()=>{navigate("/Allproducts")}} className={styles.exploreBtn} >Shop Now</button>
          </div>
        </div>
      </section>
      <section>
        <Faq theme={theme} />
      </section>
      <section id="contact-section" ref={contactRef}>
        <ContactUs theme={theme} />
      </section>
    </main>
  );
};

export default Home;
