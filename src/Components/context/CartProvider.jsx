import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("cart");
      return [];
    }
  });

  const generateTempId = () => {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 12)
    ).slice(0, 20);
  };

  const [tempUserId] = useState(() => {
    let id = localStorage.getItem("temp_user_id");
    if (!id) {
      id = generateTempId();
      localStorage.setItem("temp_user_id", id);
    }
    return id;
  });

  // persist cart
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const clearCart = () => setCart([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tempUserId,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
