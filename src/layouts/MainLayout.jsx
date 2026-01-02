import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
// import CartDrawer from "../Components/cart/CartDrawer";

function MainLayout() {
  return (
    <div>
      <Navbar />
      {/* <CartDrawer /> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
