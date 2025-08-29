import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainRouter from "./router";
import { useState, useEffect } from "react";
import WelcomeLoader from "./components/WelcomeLoader";
import { useAuth } from "./context/AuthContext";
import React from "react";
import Login from "./pages/Login/Login";
  

function App() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [showSplash, setShowSplash] = useState(true);
    const { isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);


  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // simulate loader
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <WelcomeLoader />;

  if (!isAuthenticated) return <Login theme={"light"} />;


  return (
    <div className={theme}>
      <Header toggleTheme={toggleTheme} theme={theme}  />
      <MainRouter theme={theme} />
      <Footer  />
    </div>
  );
}

export default App;
