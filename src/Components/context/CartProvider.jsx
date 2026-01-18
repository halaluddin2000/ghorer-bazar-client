import { useEffect, useState } from "react";
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
    // try {
    //   await api.post("/guest/cart/add", {
    //     temp_user_id: tempUserId,
    //     id: product.id,
    //     qty: 1,
    //   });
    // } catch (err) {
    //   console.error("Guest cart add failed", err);
    // }
  };

  const increaseQty = async (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

    await api.post("/guest/cart/update", {
      temp_user_id: tempUserId,
      product_id: id,
      type: "increase",
    });
  };

  const decreaseQty = async (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

    await api.post("/guest/cart/update", {
      temp_user_id: tempUserId,
      product_id: id,
      type: "decrease",
    });
  };

  const removeFromCart = async (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));

    await api.post("/guest/cart/remove", {
      temp_user_id: tempUserId,
      product_id: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        tempUserId, // 🔥 expose this
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
