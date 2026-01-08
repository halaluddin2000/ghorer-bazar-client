import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";
import CartDrawer from "../Components/cart/CartDrawer";
import { useState } from "react";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal";

function MainLayout() {
  const [openCOD, setOpenCOD] = useState(false);
  return (
    <div>
      <Navbar />
      <CartDrawer />
      <Outlet />
      <CashOnDeliveryModal open={openCOD} onClose={() => setOpenCOD(false)} />
      <Footer />
    </div>
  );
}

export default MainLayout;
