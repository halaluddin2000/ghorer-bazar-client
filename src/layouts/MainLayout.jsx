import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal";
import CartDrawer from "../Components/cart/CartDrawer";

function MainLayout() {
  const [openCOD, setOpenCOD] = useState(false);

  return (
    <div>
      {/* 🔑 setOpenCOD pass করো */}
      <Navbar />

      <CartDrawer onCODClick={() => setOpenCOD(true)} />

      <Outlet />

      {/* ✅ ROOT LEVEL MODAL */}
      <CashOnDeliveryModal open={openCOD} onClose={() => setOpenCOD(false)} />

      <Footer />
    </div>
  );
}

export default MainLayout;
