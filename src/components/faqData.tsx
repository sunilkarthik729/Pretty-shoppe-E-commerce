
import React from "react";
import styles from "./Faq.module.css";

interface FaqProps {
  theme: "light" | "dark";
}



const faqData = [
  {
    title: "FAQ",
    content: "Find answers to the most common questions about our products, services, and policies."
  },
  {
    title: "Quality Assurance",
    content: "We provide premium quality with strict inspections to ensure every piece meets high standards."
  },
  {
    title: "Returns & Exchange",
    content: "Enjoy hassle-free returns and exchanges within 7 days of delivery."
  },
  {
    title: "Shipping Information",
    content: "Fast and secure shipping across India with real-time tracking options."
  },
  {
    title: "Care Instructions",
    content: "Maintain your products with our detailed care tips to make them last longer."
  },
];

const Faq: React.FC<FaqProps> = ({ theme }) => {
  return (
    <section className={`${styles.faqSection} ${theme === "dark" ? styles.dark : styles.light}`}>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`${styles.faqItem} ${index % 2 === 0 ? styles.left : styles.right}`}
        >
          <div className={styles.faqContent}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Faq;

