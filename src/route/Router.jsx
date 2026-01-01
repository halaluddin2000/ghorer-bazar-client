import MainLayout from "../layouts/MainLayout";
import AllProducts from "../pages/AllProducts";
import Category from "../pages/Category";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import { createBrowserRouter } from "react-router-dom";
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
    ],
  },
]);
