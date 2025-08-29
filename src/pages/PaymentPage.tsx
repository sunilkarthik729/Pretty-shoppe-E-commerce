import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentPage.module.css";

interface PaymentPageprops {
  theme: "light" | "dark";
}
const PaymentPage: React.FC<PaymentPageprops> = ({theme}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentMethod, address, cart } = location.state || {};

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/order-success", { state: { address, cart } });
    }, 2000); // simulate payment processing
  };

  return (
   <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}><div className={styles.paymentContainer}>
      <h1 className={styles.title}>Payment</h1>

      {/* COD */}
      {paymentMethod === "cod" && (
        <div className={styles.cardBox}>
          <h2>Cash on Delivery</h2>
          <p>Pay when the order arrives at your address.</p>
          <button onClick={handlePayment} className={styles.payBtn}>
            Confirm Order ✅
          </button>
        </div>
      )}

      {/* CARD */}
      {paymentMethod === "card" && (
        <div className={styles.cardBox}>
          <h2>Enter Card Details</h2>

          {/* Dynamic card preview */}
          <div className={styles.cardPreview}>
            <p>{card.number || "**** **** **** ****"}</p>
            <p>{card.name || "CARDHOLDER NAME"}</p>
            <p>{card.expiry || "MM/YY"}</p>
          </div>

          <input
            type="text"
            placeholder="Card Number"
            value={card.number}
            maxLength={19} // 16 digits + 3 spaces
            onChange={(e) => {
              // Remove all non-digit characters
              let value = e.target.value.replace(/\D/g, "");

              // Limit to 16 digits
              value = value.substring(0, 16);

              // Add space after every 4 digits
              const formatted = value.replace(/(.{4})/g, "$1 ").trim();

              setCard({ ...card, number: formatted });
            }}
          />
          <input
            type="text"
            placeholder="Cardholder Name"
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
          />
          <input
            type="password"
            placeholder="CVV"
            maxLength={3}
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          />

          <button onClick={handlePayment} className={styles.payBtn}>
            Pay ₹{cart?.reduce((sum: number, i: any) => sum + i.finalPrice, 0)}{" "}
            🔒
          </button>
        </div>
      )}

      {/* UPI */}
      {paymentMethod === "upi" && (
        <div className={styles.cardBox}>
          <h2>UPI Payment</h2>
          <input
            type="text"
            placeholder="Enter UPI ID (eg: name@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button
            onClick={handlePayment}
            disabled={!upiId}
            className={styles.payBtn}
          >
            Pay Now 📲
          </button>
        </div>
      )}

      {/* Loading simulation */}
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
          <p>Processing Payment...</p>
        </div>
      )}
    </div></div>
    
  );
};

export default PaymentPage;
