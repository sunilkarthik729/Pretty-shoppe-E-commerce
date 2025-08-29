import React, { useState } from "react";
import styles from "./CheckoutPage.module.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface CheckoutPageProps {
  theme: "light" | "dark";
}

const CheckoutPage: React.FC <CheckoutPageProps> = ({theme}) => {
  const { cart } = useCart();
  
     const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validate form + payment simulation
    navigate("/order-success");
  };
  
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && Object.values(address).some((val) => val === "")) {
      alert("Please fill all address details");
      return;
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = () => {
  if (paymentMethod === "cod") {
    navigate("/order-success");
  } else {
    navigate("/payment", { state: { paymentMethod, address, cart } });
  }
};


  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>

      {/* 🏡 Step 1: Address Form */}
      {step === 1 && (
        <div className={styles.card}>
          <h2 className={styles.subTitle}>Shipping Address</h2>
          <form className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
            />
          </form>
          <button className={styles.nextBtn} onClick={handleNext}>
            Next ➡
          </button>
        </div>
      )}

      {/* 💳 Step 2: Payment */}
      {step === 2 && (
        <div className={styles.card}>
          <h2 className={styles.subTitle}>Payment Method</h2>
          <div className={styles.paymentOptions}>
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit/Debit Card (Simulation)
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI (Simulation)
            </label>
          </div>

          <button className={styles.placeBtn} onClick={handlePlaceOrder}>
            Place Order ✅
          </button>
        </div>
      )}

      {/* 🛒 Cart Summary */}
      <div className={styles.cartSummary}>
        <h2>Your Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <p>₹{item.finalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
