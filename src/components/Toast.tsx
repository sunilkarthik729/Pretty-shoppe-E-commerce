// Toast.tsx
import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  message: string;
  duration?: number; // in ms
};

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? <div className={styles.toast}>{message}</div> : null;
};

export default Toast;
