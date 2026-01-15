import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/login/Login";
import CashOnDeliveryPage from "../Components/Modal/CashOnDeliveryModal";
import SingUp from "../Components/singUp/SingUp";
import UserDashboard from "../Components/User/UserDashboard";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import BlogDetails from "../pages/BlogDetails";
import BlogList from "../pages/BlogList";
import CartPage from "../pages/CartPage";
import CategoryProducts from "../pages/CategoryProducts";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OrderSuccess from "../pages/OrderSuccess";
import ProductDetails from "../pages/ProductDetails";
import Repand from "../pages/Repand";
import ReturnsPolicy from "../pages/ReturnsPolicy";
import ProtectedRoute from "./ProtectedRoute";

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
        path: "/category/:slug",
        element: <CategoryProducts />,
      },
      {
        path: "/products/details/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/cash-on-delivery",
        element: <CashOnDeliveryPage />,
      },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/login", element: <Login /> },
      { path: "/singUp", element: <SingUp /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <BlogList />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/returns-policy",
        element: <ReturnsPolicy />,
      },
      {
        path: "/repand",
        element: <Repand />,
      },
      {
        path: "user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
