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

  // Generate or retrieve temp user ID
  const generateTempId = () =>
    (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 12)
    ).slice(0, 20);

  const [tempUserId] = useState(() => {
    let id = localStorage.getItem("temp_user_id");
    if (!id) {
      id = generateTempId();
      localStorage.setItem("temp_user_id", id);
    }
    return id;
  });

  // Persist cart in localStorage
  useEffect(() => {
    if (cart.length === 0) localStorage.removeItem("cart");
    else localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const clearCart = () => setCart([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        // Update quantity if already in cart
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
        );
      }
      return [...prev, item];
    });
  };

  const increaseQty = async (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + 1;

          //  Backend update
          api
            .post("/carts/change-quantity", {
              id: id,
              quantity: newQty,
            })
            .catch((err) => console.error("Increase qty failed", err));

          return { ...item, qty: newQty };
        }
        return item;
      });
    });
  };

  const decreaseQty = async (id) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty - 1;

            // যদি 0 হয় backend remove করবে automatically (many systems do)
            api
              .post("/carts/change-quantity", {
                id: id,
                quantity: newQty,
              })
              .catch((err) => console.error("Decrease qty failed", err));

            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const removeFromCart = async (id) => {
    try {
      //  Backend API call to delete
      await api.delete(`/carts/${id}`);

      //  Local state update
      setCart((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
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
