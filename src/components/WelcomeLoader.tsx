
import React, { useEffect, useState } from "react";
import styles from "./WelcomeLoader.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  duration?: number; // total show time in ms (default 2000)
  quoteInterval?: number; // change quote every ms (default 2000)
};

const quotes = [
  "Style is a way to say who you are without speaking.",
  "Dress like you’re already famous.",
  "Fashion is the armor to survive the reality of everyday life.",
  "Simplicity is the keynote of all true elegance.",
  "Wear confidence — it’s always in fashion."
];

const WelcomeLoader: React.FC<Props> = ({ duration = 2000, quoteInterval = 2000 }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // rotate quotes
    const qi = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, quoteInterval);

    // hide loader after duration
    const t = setTimeout(() => {
      // navigate or just hide — here we navigate to home
      navigate("/", { replace: true });
    }, duration);

    return () => {
      clearInterval(qi);
      clearTimeout(t);
    };
  }, [duration, quoteInterval, navigate]);

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.card}>
        <img src="/pretty-shoppe-Logo.svg" alt="Pretty Shoppe" className={styles.logo} />
        <h1 className={styles.title}>THE PRETTY SHOPPE</h1>
        <p className={styles.quote}>"{quotes[index]}"</p>
        <div className={styles.loaderDots} aria-hidden>
          <span></span><span></span><span></span>
        </div>
        <p className={styles.sub}>Redirecting to shop...</p>
      </div>
    </div>
  );
};

export default WelcomeLoader;
