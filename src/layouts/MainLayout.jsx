import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartDrawer from "../Components/cart/CartDrawer";
import ChatWidget from "../Components/ChatWidget/ChatWidget";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import ScrollToTop from "../Components/Common/ScrollToTop";
import CashOnDeliveryModal from "../Components/Modal/CashOnDeliveryModal";

function MainLayout() {
  const [openCOD, setOpenCOD] = useState(false);

  return (
    <div className="bg-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <ScrollToTop />
      <div className="">
        <Navbar />
      </div>

      <CartDrawer onCODClick={() => setOpenCOD(true)} />
      <CashOnDeliveryModal open={openCOD} onClose={() => setOpenCOD(false)} />
      <ChatWidget />

      <Outlet />

      {/*  ROOT LEVEL MODAL */}

      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
