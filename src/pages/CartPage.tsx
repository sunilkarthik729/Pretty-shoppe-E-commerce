import React from "react";
import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";
import { Link, Navigate } from "react-router-dom";

interface CartPageProps {
  theme: "light" | "dark";
}

const CartPage: React.FC<CartPageProps> = ({theme}) => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <div className={styles.cartContainer}>
      <h1 className={styles.title}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty. Start shopping now!</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.cartImg}
                />
                <div className={styles.cartDetails}>
                  <h3>{item.title}</h3>
                  <p>⭐ {item.rating}</p>
                  <p>₹ {item.finalPrice}</p>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2>Total: ₹ {totalPrice}</h2>
            {cart.length > 0 && (
              <Link to="/checkout" className="checkoutBtn">
                Proceed to Checkout ➡
              </Link>
            )}  
          </div>
        </>
      )}
    </div>
    </div>
    
  );
};

export default CartPage;
