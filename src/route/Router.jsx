import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/login/Login";
import CashOnDeliveryPage from "../Components/Modal/CashOnDeliveryModal";
import SingUp from "../Components/singUp/SingUp";
import MainLayout from "../layouts/MainLayout";
import AllProducts from "../pages/AllProducts";
import Category from "../pages/Category";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OrderSuccess from "../pages/OrderSuccess";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/category/:name",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cash-on-delivery",
        element: <CashOnDeliveryPage />,
      },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/login", element: <Login /> },
      { path: "/singUp", element: <SingUp /> },
    ],
  },
]);
