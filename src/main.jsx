import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./route/Router";
// import CartProvider from "./Components/context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CartProvider> */}
    <RouterProvider router={router} />
    {/* </CartProvider> */}
  </StrictMode>
);
