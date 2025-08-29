import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Left: Logo */}
      <div className={styles.footerLeft}>
        <img src="/pretty-shoppe-logo.png" alt="Logo" className={styles.logo} />
      </div>

      {/* Middle: Address */}
      <div className={styles.footerCenter}>
        <p>Pretty Shoppe Pvt Ltd</p>
        <p>No:729, Shopping Street, Chennai, India</p>
        <p>Email: support@prettyshoppe.com</p>
        <p>Phone: +91 9361188255</p>
      </div>
      {/* Right: Links */}
      <div className={styles.footerRight}>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;
