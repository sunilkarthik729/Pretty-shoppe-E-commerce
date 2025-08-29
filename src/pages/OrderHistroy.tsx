// src/pages/OrderHistory.tsx







import { useOrders } from "../context/OrderContext";
import { Link } from "react-router-dom";
import styles from "./OrderHistory.module.css";



interface OrderHistoryProps {
    theme: "light" | "dark";
}



const OrderHistory:React.FC<OrderHistoryProps> = ({theme}) => {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No Orders Yet 🛒</h2>
        <p>Looks like you haven’t placed any orders yet.</p>
        <Link to="/Allproducts" className={styles.shopBtn}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>My Orders</h2>

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            {/* Order Header */}
            <div className={styles.orderHeader}>
              <div>
                <p className={styles.orderId}>Order ID: {order.id}</p>
                <p className={styles.orderDate}>Placed on {order.date}</p>
              </div>
              <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                {order.status}
              </span>
            </div>

            {/* Items */}
            <ul className={styles.itemsList}>
              {order.items?.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.title} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemQty}>
                      {item.quantity} × ₹{item.finalPrice}
                    </p>
                  </div>
                  <p className={styles.itemPrice}>₹{item.finalPrice * item.quantity}</p>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.total}>Total: ₹{order.total}</p>
              <Link to={`/track/${order.id}`} className={styles.trackBtn}>
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;

