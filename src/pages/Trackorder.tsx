
import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import styles from "./TrackOrder.module.css";

const TrackOrder = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className={styles.empty}>
        <h2>Order Not Found ❌</h2>
        <Link to="/orderhistory" className={styles.backBtn}>
          Back to My Orders
        </Link>
      </div>
    );
  }

  const steps = ["Pending", "Shipped", "Delivered"];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Track Your Order</h2>

      {/* Order Details Card */}
      <div className={styles.orderCard}>
        <div className={styles.header}>
          <p className={styles.orderId}>Order ID: {order.id}</p>
          <p className={styles.orderDate}>Placed on {order.date}</p>
        </div>
        <p className={styles.total}>Total: ₹{order.total}</p>
      </div>

      {/* Progress Tracker */}
      <div className={styles.progressWrapper}>
        {steps.map((step, i) => (
          <div key={step} className={styles.stepWrapper}>
            <div
              className={`${styles.step} ${
                i <= currentStep ? styles.active : ""
              }`}
            >
              {i + 1}
            </div>
            <p
              className={`${styles.stepLabel} ${
                i <= currentStep ? styles.activeLabel : ""
              }`}
            >
              {step}
            </p>
            {i < steps.length - 1 && (
              <div
                className={`${styles.line} ${
                  i < currentStep ? styles.activeLine : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className={styles.footer}>
        <Link to="/orderhistory" className={styles.backBtn}>
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default TrackOrder;
