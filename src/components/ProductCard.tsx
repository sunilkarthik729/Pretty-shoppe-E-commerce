import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useWishlist } from "../context/WishlistContext";
import { Product } from "../types/Product"; // ensure Product type exists
import { useRef } from "react";


type ProductCardProps = {
  id: number;
  title?: string;
  category?: string;
  type?: string; // Required for Product type
  image?: string;
  previewImage?: string;
  description?: string;
  price?: number;
  discount?: number;
  finalPrice?: number;
  rating?: number;
  bestSeller?: boolean;
};

const ProductCard = (props: ProductCardProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const productItem: Product = {
    id: props.id,
    title: props.title || "",
    category: props.category || "",
    type: props.type || "",
    image: props.image || "",
    previewImage: props.previewImage || "",
    description: props.description || "",
    price: props.price || 0,
    discount: props.discount || 0,
    finalPrice: props.finalPrice || 0,
    rating: props.rating || 0,
    bestSeller: props.bestSeller || false,
  };
  
  const isFavorite = wishlist.some((p) => p.id === props.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {props.image && (
          <img src={props.image} alt={props.title} className={styles.image} />
        )}
        {props.bestSeller && <span className={styles.badge}>Best Seller</span>}
      </div>

      <div className={styles.details}>
        <h5 className={styles.title}>{props.title}</h5>
        <p className={styles.desc}>{props.description}</p>
        <p className={styles.rating}>⭐ {props.rating}</p>

        <div className={styles.priceRow}>
          {props.discount ? (
            <span className={styles.price}>
              ₹<del>{props.price}</del> {props.finalPrice}
            </span>
          ) : (
            <span className={styles.finalPrice}>₹{props.price}</span>
          )}

          <button
            className={styles.shopBtn}
            onClick={() => navigate("/Allproducts")}
          >
            Shop Now
          </button>
          <Link to={`/product/${props.id}`}>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg mt-2">
              View Details
            </button>
          </Link>

          <button
            className={`${styles.wishlistBtn} ${
              isFavorite ? styles.active : ""
            }`}
            onClick={() => toggleWishlist(productItem)} 
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
