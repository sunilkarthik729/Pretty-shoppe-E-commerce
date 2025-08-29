import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import MainRouter from "./router";
import { WishlistProvider } from "./context/WishlistContext";
import { useState, useEffect } from "react";
import WelcomeLoader from "./components/WelcomeLoader";

function App() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [showSplash, setShowSplash] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
  document.body.className = theme;
}, [theme]);
     useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3200); // backup hide
    return () => clearTimeout(t);
  }, []);
    if (showSplash) {
    return <WelcomeLoader duration={2000} quoteInterval={1800} />;
  }


  return (
    <div className={theme}>
      <Header toggleTheme={toggleTheme} theme={theme}  />
      <MainRouter theme={theme} />
      <Footer  />
    </div>
  );
}

export default App;
