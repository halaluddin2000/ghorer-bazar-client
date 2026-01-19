import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import api from "../../api/axios";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [tempUserId] = useState(() => {
    let id = localStorage.getItem("temp_user_id");
    if (!id) {
      id = uuid().replace(/-/g, "").slice(0, 20);
      localStorage.setItem("temp_user_id", id);
    }
    return id;
  });

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

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
