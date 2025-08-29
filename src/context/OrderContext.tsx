// src/context/OrderContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";

type Order = {
  id: string;
  items: (Product & { quantity: number })[];
  total: number;
  date: string;
  status: "Pending" | "Shipped" | "Delivered";
};

type OrderContextType = {
  orders: Order[];
  addOrder: (items: (Product & { quantity: number })[], total: number) => void;
};

const OrderContext = createContext<OrderContextType>({
  orders: [],
  addOrder: () => {},
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const addOrder = (items: (Product & { quantity: number })[], total: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
