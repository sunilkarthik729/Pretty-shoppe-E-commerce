import React, { useRef, useState } from "react";
import styles from "./Products.module.css";
import productsData from "../data/products.json";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

interface ProductListingProps {
  theme: "light" | "dark";
}

const ProductListing: React.FC<ProductListingProps>  = ({theme}) => {
  const products: Product[] = Array.isArray(productsData)
    ? productsData
    : productsData;

  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({}); // store refs
  const cartIconRef = useRef<HTMLDivElement | null>(null);

  const handleAddToCart = (item: Product) => {
    const imgEl = imgRefs.current[item.id];
    const cartEl = cartIconRef.current;

    if (imgEl && cartEl) {
      // Get coordinates
      const imgRect = imgEl.getBoundingClientRect();
      const cartRect = cartEl.getBoundingClientRect();

      // Clone the image
      const clone = imgEl.cloneNode(true) as HTMLImageElement;
      clone.style.position = "absolute";
      clone.style.top = `${imgRect.top}px`;
      clone.style.left = `${imgRect.left}px`;
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.transition = "all 0.8s ease-in-out";
      clone.style.zIndex = "9999";
      document.body.appendChild(clone);

      // Trigger animation
      requestAnimationFrame(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = "30px";
        clone.style.height = "30px";
        clone.style.opacity = "0.5";
      });

      // Remove clone after animation
      clone.addEventListener("transitionend", () => {
        clone.remove();
      });
    }

    // Add to cart & show toast
    addToCart(item);
    setToastMessage(`${item.title} added to cart ✅`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Divide categories
  const mensShirts = products.filter((p) => p.type.toLowerCase() === "shirt");
  const mensPants = products.filter((p) => p.type.toLowerCase() === "pant");
  const womensKurtis = products.filter((p) => p.type.toLowerCase() === "kurti");

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}><div className={styles.container}>
      <h1 className={styles.pageTitle}>Our Collections</h1>

      {/* Men's Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Men's Collection</h2>

        <div className={styles.subSection}>
          <h3 className={styles.subTitle}>Shirts</h3>
          <div className={styles.productGrid}>
            {mensShirts.map((item) => (
              <div key={item.id} className={styles.card}>
                <img
                  ref={(el) => {
                    imgRefs.current[item.id] = el;
                  }}
                  src={item.image}
                  alt={item.title}
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardPrice}>₹{item.finalPrice}</p>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <p className={styles.productRating}>⭐{item.rating}</p>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.subSection}>
          <h3 className={styles.subTitle}>Pants</h3>
          <div className={styles.productGrid}>
            {mensPants.map((item) => (
              <div key={item.id} className={styles.card}>
                <img
                  ref={(el) => {
                    imgRefs.current[item.id] = el;
                  }}
                  src={item.image}
                  alt={item.title}
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardPrice}>₹{item.finalPrice}</p>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <p className={styles.productRating}>⭐{item.rating}</p>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Women's Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Women's Collection</h2>

        <div className={styles.subSection}>
          <h3 className={styles.subTitle}>Kurtis</h3>
          <div className={styles.productGrid}>
            {womensKurtis.map((item) => (
              <div key={item.id} className={styles.card}>
                <img
                  ref={(el) => {
                    imgRefs.current[item.id] = el;
                  }}
                  src={item.image}
                  alt={item.title}
                  className={styles.cardImg}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.cardPrice}>₹{item.finalPrice}</p>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <p className={styles.productRating}>⭐{item.rating}</p>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showToast && <div className={styles.toast}>{toastMessage}</div>}
    </div></div>
    
  );
};

export default ProductListing;
