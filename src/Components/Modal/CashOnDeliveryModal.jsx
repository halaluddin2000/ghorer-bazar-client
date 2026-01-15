import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { CartContext } from "../context/CartContext";

const CashOnDeliveryModal = ({ open, onClose }) => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  // OTP related states
  const [otpSent, setOtpSent] = useState(false); // OTP পাঠানো হয়েছে কি না
  const [otpVerified, setOtpVerified] = useState(false); // OTP verify হয়েছে কি না
  const [otp, setOtp] = useState(""); // User OTP input

  const [animate, setAnimate] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    shipping: "dhaka",
    note: "",
  });
  console.log("Form data", form);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  //OTP
  const handleSendOtp = async () => {
    if (!form.phone || !phoneRegex.test(form.phone)) {
      toast.error("সঠিক ফোন নাম্বার দিন");
      return;
    }
    try {
      await api.post("/send-otp", { phone: form.phone }); // তোমার backend api
      toast.success("OTP পাঠানো হয়েছে ✅");
      setOtpSent(true);
    } catch (err) {
      toast.error("OTP পাঠানো যায়নি। আবার চেষ্টা করুন।");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("OTP দিন");
      return;
    }
    try {
      await api.post("/verify-otp", { phone: form.phone, otp }); // backend verify
      toast.success("OTP verified ✅");
      setOtpVerified(true);
    } catch (err) {
      toast.error("OTP ভুল, আবার চেষ্টা করুন");
    }
  };

  // ESC close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!open) return null;

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCharge =
    form.shipping === "dhaka" || form.shipping === "ctg" ? 70 : 130;
  const total = subtotal + shippingCharge;

  const phoneRegex = /^(?:\+88|01)?[3-9]\d{8}$/;

  const handleConfirm = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }
    if (!phoneRegex.test(form.phone)) {
      toast.error("সঠিক ফোন নাম্বার দিন");
      return;
    }

    toast.success("অর্ডার কনফার্ম হয়েছে ✅");
    setTimeout(() => {
      clearCart();
      onClose();
      navigate("/order-success");
    }, 1200);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div
          className={`bg-white w-full sm:w-3/4 md:w-2/5 rounded shadow-lg
            max-h-[90vh] overflow-y-auto transform transition-all duration-300
            ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-sm sm:text-base md:text-lg">
              ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
            </h2>
            <button
              onClick={onClose}
              className="text-xl font-bold hover:text-red-500"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-sm sm:text-base">
            {/* User info */}

            <input
              placeholder="ফোন নাম্বার"
              className="w-full border bg-white p-2 rounded disabled:bg-gray-100"
              disabled={otpVerified} // OTP verify হলে phone change না করতে
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {/* Send OTP */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="mt-2 px-4 py-1 bg-[#2CC4F4] text-white rounded"
              >
                Send OTP
              </button>
            )}
            {otpSent && !otpVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  placeholder="Verification Code"
                  className="flex-1 border p-2 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="px-3 bg-green-500 text-white rounded"
                >
                  Verify
                </button>
              </div>
            )}

            <input
              placeholder="আপনার নাম"
              className="w-full border bg-white p-2 rounded disabled:bg-gray-100"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              placeholder="এড্রেস"
              className="w-full border bg-white p-2 rounded resize-none disabled:bg-gray-100"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* Shipping Method */}
            <div>
              <p className="font-medium mb-1">শিপিং মেথড</p>
              {[
                ["dhaka", "ঢাকা সিটির ভিতরে", 70],
                ["ctg", "চট্টগ্রাম সিটির ভিতরে", 70],
              ].map(([key, label, price]) => (
                <label
                  key={key}
                  className="flex justify-between border p-2 rounded mb-1 cursor-pointer"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={form.shipping === key}
                      onChange={() => setForm({ ...form, shipping: key })}
                      className="mr-2"
                    />
                    <span>{label}</span>
                  </div>
                  <span>Tk {price}.00</span>
                </label>
              ))}
            </div>

            {/* Coupon */}
            <div>
              <p className="font-medium mb-1">কুপন কোড</p>
              <div className="flex gap-2">
                <input
                  placeholder="Enter coupon code"
                  className="flex-1 border p-2 rounded bg-white"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  onClick={() => toast.info("Coupon feature coming soon")}
                  className="px-4 bg-gray-200 rounded"
                >
                  এপ্লাই
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="border-t pt-2 space-y-2">
              {cart.map((i) => (
                <div key={i.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={i.image}
                      className="w-16 h-14 object-cover"
                      alt=""
                    />
                    <span>
                      {i.qty} × {i.name}
                    </span>
                  </div>
                  <span>Tk {(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span>সাব টোটাল</span>
                <span>Tk {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>Tk {shippingCharge}.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>সর্বমোট</span>
                <span>Tk {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Note */}
            <textarea
              placeholder="Order note"
              className="w-full border bg-white p-2 rounded resize-none"
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            {/* Actions */}
            <button
              onClick={handleConfirm}
              className="w-full bg-[#2CC4F4] text-white py-2 rounded disabled:opacity-50"
            >
              আপনার অর্ডার কনফার্ম করতে ক্লিক করুন
            </button>

            <button
              onClick={() => toast.info("Online payment coming soon")}
              className="w-full bg-gray-200 py-2 rounded"
            >
              Pay Online
            </button>

            <p className="text-xs text-gray-500 text-center">
              উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOnDeliveryModal;
