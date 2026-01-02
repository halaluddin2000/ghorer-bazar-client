// import { createContext, useState } from "react";

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const addToCart = (product) => {
//     const exists = cart.find((item) => item.id === product.id);

//     if (exists) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id ? { ...item, qty: item.qty + 1 } : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, qty: 1 }]);
//     }

//     setIsDrawerOpen(true);
//   };

//   const increaseQty = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCart(
//       cart
//         .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
//         .filter((item) => item.qty > 0)
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         isDrawerOpen,
//         setIsDrawerOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
