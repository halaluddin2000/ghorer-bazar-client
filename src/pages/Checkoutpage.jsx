import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import api from "../../api/axios";
import api from "../api/axios";
import { CartContext } from "../Components/context/CartContext";
// import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [shippingArea, setShippingArea] = useState("dhaka");
  const {
    cart,
    setIsDrawerOpen,
    increaseQty,
    decreaseQty,
    removeFromCart,
    addToCart,
    clearCart,
  } = useContext(CartContext);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // form state
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    billingAddress: "",
    note: "",
  });
  const [noteLen, setNoteLen] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | online | bkash
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [billingOpen, setBillingOpen] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  // price
  const subtotal = cart.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  const deliveryCost = shippingArea === "dhaka" ? 70 : 160;
  const total = subtotal + deliveryCost;

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("সব প্রয়োজনীয় তথ্য পূরণ করুন");
      return;
    }
    if (!agreed) {
      toast.error("Terms and Conditions এ সম্মতি দিন");
      return;
    }
    if (cart.length === 0) {
      toast.error("কার্ট খালি");
      return;
    }

    const tempUserId = localStorage.getItem("temp_user_id") || "";
    const token = localStorage.getItem("token");

    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      note: form.note,
      shipping_cost: deliveryCost,
      shipping_area: shippingArea,
      coupon,
      cart: [...cart],
      payment_method: paymentMethod,
      temp_user_id: tempUserId,
    };

    setLoading(true);
    try {
      const endpoint = token ? "/user/order/store" : "/gust/user/order/store";
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post(endpoint, payload, { headers });

      if (res.data?.result) {
        const orderId = res.data?.order_id;
        toast.success(res.data.message || "অর্ডার কনফার্ম হয়েছে ✅");
        clearCart();
        localStorage.removeItem("temp_user_id");
        setIsDrawerOpen(false);

        if (paymentMethod !== "cod" && res.data?.payment_url) {
          window.location.href = res.data.payment_url;
        } else {
          navigate(`/purchase-order/${orderId}`);
        }
      } else {
        toast.error(res.data?.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Page Title ── */}
      <div className="bg-white py-5 text-center border-b">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-sm mt-1 text-gray-500">
          <Link to="/" className="hover:text-[#1FA3DC]">
            Home
          </Link>
          <span className="mx-1 text-gray-400">›</span>
          <span className="text-[#1FA3DC]">Checkout</span>
        </p>
      </div>

      {/* ── Login / Register banner ── */}
      <div className="container mb-5 bg-white border-b">
        <div className=" mx-auto px-4 py-3 flex items-center justify-between text-sm text-gray-600">
          <span>Have any account? please login or register</span>
          <div className="flex gap-2">
            <Link to="/login">
              <button className="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-1.5 bg-[#1FA3DC] text-white rounded text-sm hover:bg-[#1FA3DC]">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex mt-4 flex-col lg:flex-row gap-6">
          {/* ════ LEFT COLUMN ════ */}
          <div className="flex-1 space-y-5">
            {/* Order Review */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#1FA3DC] rounded-full inline-block" />
                Order review
              </h2>
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">
                  Cart is empty
                </p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-3 last:border-none last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-gray-500">Qty:</span>
                          <button
                            onClick={() => decreaseQty(item.id)}
                            disabled={item.qty === 1}
                            className="w-6 h-6 border rounded flex items-center justify-center text-gray-600 text-sm disabled:opacity-40 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-6 h-6 border rounded flex items-center justify-center text-gray-600 text-sm hover:bg-gray-100"
                          >
                            +
                          </button>
                          <span className="text-sm text-[#1FA3DC] font-semibold ml-2">
                            ৳
                            {(
                              parseFloat(item.price) * item.qty
                            ).toLocaleString()}
                            .00
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#1FA3DC] rounded-full inline-block" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Full Name *"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                />
                <div className="flex gap-2">
                  <span className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500 shrink-0">
                    88
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="017********"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="ex: House no. / building / street / area"
                  className="sm:col-span-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                />
                {/* Shipping Area */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Area
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`border rounded-lg p-3 cursor-pointer transition ${
                        shippingArea === "dhaka"
                          ? "border-[#1FA3DC] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={shippingArea === "dhaka"}
                            onChange={() => setShippingArea("dhaka")}
                          />
                          <span>Dhaka City</span>
                        </div>

                        <span className="font-semibold">৳70</span>
                      </div>
                    </label>

                    <label
                      className={`border rounded-lg p-3 cursor-pointer transition ${
                        shippingArea === "outside"
                          ? "border-[#1FA3DC] bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={shippingArea === "outside"}
                            onChange={() => setShippingArea("outside")}
                          />
                          <span>Outside Dhaka</span>
                        </div>

                        <span className="font-semibold">৳160</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <button
                onClick={() => setBillingOpen(!billingOpen)}
                className="w-full flex items-center justify-between"
              >
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#1FA3DC] rounded-full inline-block" />
                  Billing Address
                </h2>
                <div
                  className={`w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center transition-transform ${billingOpen ? "rotate-45" : ""}`}
                >
                  <span className="text-orange-400 text-sm font-bold leading-none">
                    +
                  </span>
                </div>
              </button>
              {billingOpen && (
                <div className="mt-4">
                  <input
                    value={form.billingAddress}
                    onChange={(e) =>
                      setForm({ ...form, billingAddress: e.target.value })
                    }
                    placeholder="Billing address (if different from shipping)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div className="w-full lg:w-[420px] space-y-5">
            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#1FA3DC] rounded-full inline-block" />
                Payment method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "cod", label: "Cash On Delivery", icon: "💰" },
                  { key: "online", label: "Online Payment", icon: "💳" },
                  { key: "bkash", label: "Bkash", icon: "🅱️" },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setPaymentMethod(key)}
                    className={`flex items-center gap-2 px-3 py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                      paymentMethod === key
                        ? "border-orange-400 bg-orange-50 text-[#1FA3DC]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200"
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="text-xs">{label}</span>
                    {paymentMethod === key && (
                      <span className="ml-auto text-[#1FA3DC]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon accordion */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button
                onClick={() => setCouponOpen(!couponOpen)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700"
              >
                <span>Have any coupon or gift voucher?</span>
                <span className="text-gray-400 text-lg">
                  {couponOpen ? "∧" : "∨"}
                </span>
              </button>
              {couponOpen && (
                <div className="px-5 pb-4 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-orange-400"
                  />
                  <button
                    onClick={() => toast.info("Coupon feature coming soon")}
                    className="px-4 py-2 bg-[#1FA3DC] text-white text-sm rounded-lg hover:bg-[#1FA3DC] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sub total</span>
                <span>{subtotal.toLocaleString()}.00 BDT</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-b pb-3">
                <span>Delivery cost</span>
                <span>
                  {deliveryCost === 0 ? "0 BDT" : `${deliveryCost} BDT`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>{total.toLocaleString()}.00BDT</span>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#1FA3DC] rounded-full inline-block" />
                Special notes
                <span className="text-gray-400 font-normal text-sm">
                  (Optional)
                </span>
              </h2>
              <textarea
                rows={3}
                maxLength={90}
                value={form.note}
                onChange={(e) => {
                  setForm({ ...form, note: e.target.value });
                  setNoteLen(e.target.value.length);
                }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white resize-none focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
              />
              <p className="text-xs text-gray-400 mt-1">
                {noteLen} / 90 characters
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 px-1">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  agreed ? "bg-[#1FA3DC] border-[#1FA3DC]" : "border-gray-300"
                }`}
              >
                {agreed && <span className="text-white text-xs">✓</span>}
              </button>
              <p className="text-sm text-gray-600">
                I have read and agree to the{" "}
                <Link to="/terms" className="text-[#1FA3DC] hover:underline">
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link to="/privacy" className="text-[#1FA3DC] hover:underline">
                  Privacy Policy
                </Link>{" "}
                &{" "}
                <Link to="/refund" className="text-[#1FA3DC] hover:underline">
                  Refund and Return Policy
                </Link>
                .
              </p>
            </div>

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="w-full py-4 bg-[#1FA3DC] hover:bg-[#1FA3DC] disabled:bg-gray-300 text-white font-bold text-sm tracking-widest rounded-xl transition-colors uppercase shadow-md"
            >
              {loading ? "Processing…" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
