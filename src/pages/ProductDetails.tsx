import { useParams } from "react-router-dom";
import products from "../data/products.json";
import styles from "./ProductDetails.module.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

interface ProductDetailsProps {
  theme: "light" | "dark";
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ theme }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!product) {
    return <p className={styles.notFound}>❌ Product not found</p>;
  }

  // check wishlist state
  const isInWishlist = wishlist.some((p) => p.id === product.id);

  return (
    <div className={theme === "dark" ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Image */}
          <div className={styles.imageSection}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.mainImage}
            />
          </div>

          {/* Details */}
          <div className={styles.detailsSection}>
            <div>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.description}>{product.description}</p>

              <div className={styles.pricing}>
                <p className={styles.finalPrice}>₹{product.finalPrice}</p>
                <p className={styles.oldPrice}>₹{product.price}</p>
                <p className={styles.discount}>{product.discount}% OFF</p>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button
                className={styles.cartBtn}
                onClick={() => addToCart(product)}
              >
                🛒 Add to Cart
              </button>

        

              <button
                className={styles.wishlistBtn}
                onClick={() => toggleWishlist(product)}
              >
                {isInWishlist ? "❤️ Remove Wishlist" : "♡ Add Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Extra Info Section (same as before) */}
      </div>
    </div>
  );
};

export default ProductDetails;
