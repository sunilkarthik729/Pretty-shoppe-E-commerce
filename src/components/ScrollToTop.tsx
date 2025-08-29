import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      // Home page ku vandha udane top ku pogum
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Vera page ku vandha header height ku keezha pogum
      const header = document.getElementById("header");
      if (header) {
        const offset = header.offsetHeight;
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
