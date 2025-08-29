import { useState } from "react";
import styles from "./components.module.css";

interface ContactUs {
  theme: "light" | "dark";
}

const ContactUs: React.FC<ContactUs> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData); // backend ku anuppa vendiyadhu inga
    alert("Thank you! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // reset form
  };

  return (
    <section className={styles.contactSection}>
      <h2>Contact Us</h2>
      <p className={styles.contactText}>
        Have questions or feedback? Feel free to reach out to us. We value your
        input and are always here to assist you with any inquiries you may have.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
