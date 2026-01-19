import { useEffect, useState } from "react";
import api from "../../api/axios";
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
  const [tempUserId] = useState(() => {
    let id = localStorage.getItem("temp_user_id");
    if (!id) {
      id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
      localStorage.setItem("temp_user_id", id);
    }
    return id;
  });

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const clearCart = () => setCart([]);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  //  Add to cart
  const addToCart = async (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    //  backend guest cart sync
    try {
      await api.post("/guest/cart/add", {
        temp_user_id: tempUserId,
        product_id: product.id,
        qty: 1,
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const increaseQty = async (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseQty = async (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = async (id) => {
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
