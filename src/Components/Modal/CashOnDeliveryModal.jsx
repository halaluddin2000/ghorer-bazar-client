import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CashOnDeliveryModal = ({ open, onClose }) => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    shipping: "dhaka",
    note: "",
  });

  if (!open) return null; // 🔴 modal বন্ধ থাকলে render হবে না

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
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
    }, 1500);
  };

  return (
    <>
      {/* 🔳 Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
      />

      {/* 🟦 Modal Center */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3">
        <div className="bg-white w-full max-w-3xl rounded shadow-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
            </h2>
            <button onClick={onClose} className="text-xl font-bold">
              ×
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-sm">
            <input
              placeholder="আপনার নাম"
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="ফোন নাম্বার"
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              placeholder="এড্রেস"
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* Shipping */}
            <div>
              <p className="font-medium mb-1">শিপিং মেথড</p>
              {[
                ["dhaka", "ঢাকা সিটির ভিতরে", 70],
                ["ctg", "চট্টগ্রাম সিটির ভিতরে", 70],
                ["outside", "ঢাকা ও চট্টগ্রামের বাহিরে", 130],
              ].map(([key, label, price]) => (
                <label
                  key={key}
                  className="flex justify-between border p-2 rounded mb-1"
                >
                  <div>
                    <input
                      type="radio"
                      checked={form.shipping === key}
                      onChange={() => setForm({ ...form, shipping: key })}
                    />
                    <span className="pl-3">{label}</span>
                  </div>
                  <span>Tk {price}</span>
                </label>
              ))}
            </div>

            {/* Cart Items */}
            <div className="border-t pt-2 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-14 h-12 rounded"
                      alt=""
                    />
                    <span>
                      {item.name} × {item.qty}
                    </span>
                  </div>
                  <span>Tk {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between">
                <span>সাব টোটাল</span>
                <span>Tk {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span>Tk {shippingCharge}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>সর্বমোট</span>
                <span>Tk {total}</span>
              </div>
            </div>

            <textarea
              placeholder="Order note"
              className="w-full border p-2 rounded"
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            <button
              onClick={handleConfirm}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              আপনার অর্ডার কনফার্ম করতে ক্লিক করুন
            </button>

            <p className="text-xs text-gray-500 text-center">
              উপরের বাটনে ক্লিক করলে অর্ডার সাথে সাথে কনফার্ম হবে
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOnDeliveryModal;
