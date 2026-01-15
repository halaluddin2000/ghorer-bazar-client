import { useState } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "../Components/cart/CartDrawer";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import ScrollToTop from "../Components/Common/ScrollToTop";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal";

function MainLayout() {
  const [openCOD, setOpenCOD] = useState(false);

  return (
    <div className="bg-white">
      <ScrollToTop />
      <div className="">
        <Navbar />
      </div>

      <CartDrawer onCODClick={() => setOpenCOD(true)} />

      <Outlet />

      {/*  ROOT LEVEL MODAL */}
      <CashOnDeliveryModal open={openCOD} onClose={() => setOpenCOD(false)} />
      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
