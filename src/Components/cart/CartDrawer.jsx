// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// const CartDrawer = () => {
//   const { cart, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50
//       transform transition-transform duration-300
//       ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
//     >
//       <div className="p-4 border-b flex justify-between">
//         <h2 className="font-bold text-lg">Your Cart</h2>
//         <button onClick={() => setIsDrawerOpen(false)}>✕</button>
//       </div>

//       <div className="p-4 space-y-4">
//         {cart.length === 0 && <p>Cart is empty</p>}

//         {cart.map((item) => (
//           <div key={item.id} className="flex justify-between">
//             <span>
//               {item.name} × {item.qty}
//             </span>
//             <span>৳ {item.price * item.qty}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;
