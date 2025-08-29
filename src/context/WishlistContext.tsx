import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  toggleWishlist: () => {}, // placeholder should NOT throw error
});

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) {
      // ✅ remove if already exists
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      // ✅ add if not exists
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
