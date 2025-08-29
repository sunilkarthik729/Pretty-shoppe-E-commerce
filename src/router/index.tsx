import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../components/products";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccess from "../pages/OrderSucess";
import ScrollToTop from "../components/ScrollToTop";
import PaymentPage from "../pages/PaymentPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import ProductDetails from "../pages/ProductDetails";
import OrderHistory from "../pages/OrderHistroy";
import TrackOrder from "../pages/Trackorder";



type MainRouterProps = {
  theme: "light" | "dark";
};
const MainRouter: React.FC<MainRouterProps>= ({theme}) => {
  return (
        <>
          <ScrollToTop/>
        <Routes>
        <Route path="/" element={<Home theme={theme}/>} />
        <Route path="/About" element={<About theme={theme}/>} />
        <Route path="/Allproducts" element={<Products theme={theme} />} />
        <Route path="/cart" element={<CartPage theme={theme} />} />
        <Route path="/checkout" element={<CheckoutPage theme={theme}/>} />
        <Route path="/order-success" element={<OrderSuccess theme={theme}/>} />
        <Route path="/payment" element={<PaymentPage theme={theme}/>} />
        <Route path="/login" element={<Login theme={theme}/>} />
        <Route path="/signup" element={<Signup theme={theme}/>} />
        <Route path="/product/:id" element={<ProductDetails theme={theme}/>} />
        <Route path="/orderhistory" element={<OrderHistory theme={theme}/>}/>
        <Route path="/track/:id" element={<TrackOrder/>} />
      </Routes>
        </>
      
      
      
    
  );
};

export default MainRouter;
