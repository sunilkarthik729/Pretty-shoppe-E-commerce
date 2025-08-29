import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./OrderSucess.module.css";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

interface OrderSuccessProps {
  theme: "light" | "dark";
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ theme }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { cart } = useCart();
  // auto navigate home after 5s (optional)
  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  const handleContinue = () => {
    navigate("/");
  };
  const { addOrder } = useOrders();

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
      );
      addOrder(cart, total);
    }
  }, [cart, addOrder]);

  return (
    <div
      className={
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }
    >
      <div className={styles.successContainer}>
        <div className={styles.card}>
          <div className={styles.checkmarkWrapper}>
            <svg
              className={styles.checkmark}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className={styles.checkmarkCircle}
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className={styles.checkmarkCheck}
                fill="none"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>
          <h1 className={styles.title}>Order Placed Successfully 🎉</h1>
          <p className={styles.message}>
            Thank you for shopping with us. Your order is being processed.
          </p>
          <button className={styles.homeBtn} onClick={handleContinue}>
            Continue Shopping
          </button>
          <Link to="/orderhistory">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              View My Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
