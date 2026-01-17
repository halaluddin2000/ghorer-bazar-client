import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { CartContext } from "../context/CartContext";

const CashOnDeliveryModal = ({ open, onClose }) => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(""); // OTP string

  const [animate, setAnimate] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    shipping: "dhaka",
    note: "",
  });

  const phoneRegex = /^(?:\+88|01)?[3-9]\d{8}$/;

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!form.phone || !phoneRegex.test(form.phone)) {
      toast.error("সঠিক ফোন নাম্বার দিন");
      return;
    }
    try {
      await api.post("/auth/check-phone-number", { phone: form.phone });
      toast.success("Verification code পাঠানো হয়েছে ✅");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Verification code পাঠানো যায়নি। আবার চেষ্টা করুন।");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Verification code দিন");
      return;
    }
    try {
      const res = await api.post("/auth/verify-otp", {
        phone: form.phone,
        otp,
      });
      if (res.data?.success) {
        toast.success("OTP verified ✅");
        setOtpVerified(true);
      } else {
        toast.error("OTP mismatch! আবার চেষ্টা করুন");
        setOtpVerified(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
      setOtpVerified(false);
    }
  };

  // Confirm Order
  const handleConfirm = async () => {
    if (!otpVerified) {
      toast.error("OTP verify করুন");
      return;
    }
    if (!form.name || !form.phone || !form.address) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    const payload = {
      user: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        shipping: form.shipping,
        coupon,
      },
      cart,
      verification_code: otp,
    };

    console.log("Order Payload:", payload);

    try {
      const res = await api.post("/gust/user/order/store", payload);
      console.log("Backend Response:", res.data);
      if (res.data?.success) {
        toast.success("অর্ডার কনফার্ম হয়েছে ✅");
        clearCart();
        onClose();
        navigate("/order-success");
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    }
  };

  // Subtotal calculation with proper decimal
  const subtotal = cart.reduce((s, i) => {
    const price = parseFloat(i.price); // string থেকে float
    return s + price * i.qty;
  }, 0);

  const shippingCharge =
    form.shipping === "dhaka" || form.shipping === "ctg" ? 70 : 130;
  const total = subtotal + shippingCharge;

  if (!open) return null;

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
            <h2 className="font-semibold text-center px-2 text-sm sm:text-base md:text-lg">
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
            {/* Phone */}
            <input
              placeholder="ফোন নাম্বার"
              className="w-full bg-white border p-2 rounded"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {/* Send OTP */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="mt-2 px-4 py-1 bg-[#2CC4F4] text-white rounded"
              >
                Apply
              </button>
            )}

            {/* OTP input */}
            {otpSent && !otpVerified && (
              <div className="flex gap-2 mt-2">
                <input
                  placeholder="Verification Code"
                  className="flex-1 bg-white border p-2 rounded"
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

            {/* Name */}
            <input
              placeholder="আপনার নাম"
              className="w-full bg-white border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Address */}
            <textarea
              placeholder="এড্রেস"
              className="w-full bg-white border p-2 rounded resize-none"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* Shipping Method */}
            <div>
              <p className="font-medium mb-1">শিপিং মেথড</p>
              {[
                ["dhaka", "ঢাকা সিটির ভিতরে", 70],
                ["outsite", "ঢাকা সিটির বাহিরে", 160],
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
                  <span>Tk {price.toFixed(2)}</span>
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
                  Apply
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
                  <span>Tk {(parseFloat(i.price) * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span>সাব টোটাল</span>
                <span>Tk {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>Tk {shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>সর্বমোট</span>
                <span>Tk {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Note */}
            <textarea
              placeholder="Order note"
              className="w-full bg-white border p-2 rounded resize-none"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            {/* Confirm */}
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
              OTP verify না হলে Confirm button কাজ করবে না, সব input editable।
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOnDeliveryModal;
