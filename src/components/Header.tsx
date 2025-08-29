import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type HeaderProps = {
  toggleTheme: () => void;
  theme: "light" | "dark";
};

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    window.location.reload();
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="header" className={`header ${theme}`}>
      {/* Top header: Logo + Hamburger (mobile) */}
      <section className={styles.header}>
        <div>
          <img
            src="/pretty-shoppe-Logo.svg"
            alt="logo"
            className={styles.logo}
          />
        </div>

        {/* Desktop Right Nav */}
        <div className={styles.navRight}>
          {loggedInUser ? (
            <div className={styles.userBox}>
              <span className={styles.username}>
                <div className={styles.avatar}>
                  {loggedInUser.charAt(0).toUpperCase()}
                </div>
                {loggedInUser}
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>

            </div>
          ) : (
            <>
              <Link to={"/login"} className={styles.login}>
                Login
              </Link>
              <Link to={"/signup"} className={styles.login}>
                Signup
              </Link>
              
            </>
          )}

          {/* Cart */}
          <Link to="/cart" className={styles.cart}>
            🛒
            {cart.length > 0 && (
              <span className={styles.cartCount}>{cart.length}</span>
            )}
          </Link>
          <Link to="/orderhistory" className={styles.login}>
  My Orders
</Link>


          {/* Theme Toggle */}
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Wishlist */}
          <div
            className={styles.wishlistWrapper}
            onClick={() => setWishlistOpen(!wishlistOpen)}
          >
            <div className={styles.wishlistIcon}>❤️</div>
            {wishlist.length > 0 && (
              <span className={styles.wishlistCount}>{wishlist.length}</span>
            )}
            <div className={styles.wishlistDropdown}>
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <div key={item.id} className={styles.dropdownItem}>
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleWishlist(item)}
                    >
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No items in wishlist</div>
              )}
            </div>
          </div>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </section>

      {/* Desktop Navigation */}
      <section className={styles.header}>
        <div></div>
        <nav className={styles.navRight1}>
          <Link to="/" className={styles.sections}>
            Home
          </Link>
          <Link to="/About" className={styles.sections}>
            About Us
          </Link>
          <Link to="/Allproducts" className={styles.sections}>
            Shop All
          </Link>
          <span className={styles.sections} onClick={scrollToContact}>
            Contact
          </span>
        </nav>
      </section>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* Nav Links */}
          <Link
            to="/"
            className={styles.sections}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/About"
            className={styles.sections}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/Allproducts"
            className={styles.sections}
            onClick={() => setMenuOpen(false)}
          >
            Shop All
          </Link>
          <span
            className={styles.sections}
            onClick={() => {
              scrollToContact();
              setMenuOpen(false);
            }}
          >
            Contact
          </span>
            <Link
            to="/orderhistory"
            className={styles.sections}
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>
          <hr />

          {/* Profile + Cart + Wishlist + Theme inside mobile menu */}
          {loggedInUser ? (
            <div className={styles.userBox}>
              <span className={styles.username}>
                <div className={styles.avatar}>
                  {loggedInUser.charAt(0).toUpperCase()}
                </div>
                {loggedInUser}
              </span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuth}>
              <Link to={"/login"} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to={"/signup"} onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </div>
          )}

          <Link
            to="/cart"
            className={styles.cart}
            onClick={() => setMenuOpen(false)}
          >
            🛒 Cart {cart.length > 0 && `(${cart.length})`}
          </Link>

          <div
            className={styles.wishlistWrapper}
            onClick={() => setWishlistOpen(!wishlistOpen)}
          >
            <div className={styles.wishlistIcon}>❤️</div>
            {wishlist.length > 0 && (
              <span className={styles.wishlistCount}>{wishlist.length}</span>
            )}
            <div className={styles.wishlistDropdown}>
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <div key={item.id} className={styles.dropdownItem}>
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => toggleWishlist(item)}
                    >
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No items in wishlist</div>
              )}
            </div>
          </div>

          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
