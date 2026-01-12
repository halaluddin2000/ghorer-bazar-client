import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CashOnDeliveryModal from "../Modal/CashOnDeliveryModal";

const CartDrawer = ({ onCODClick }) => {
  const [openCOD, setOpenCOD] = useState(false);

  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  // Note ও Coupon এর জন্য local state (simple)
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Simple coupon logic: যদি coupon লেখা হয় "SAVE10", 10% off
  const discount = couponApplied && coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-full max-w-xs md:max-w-md h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Cart items */}
        <div className="p-2 space-y-2 overflow-y-auto h-[30%]">
          {cart.length === 0 && (
            <p className="text-center text-gray-500">Cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border rounded p-2"
            >
              {/* Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-20 object-cover rounded"
                />
              )}

              <div className="flex-1">
                {/* Name & price */}
                <h4 className="font-medium text-lg">{item.name}</h4>
                <p className="text-lg text-gray-600">
                  Tk {item.price.toLocaleString()}
                </p>

                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.qty === 1}
                    className={`px-2 py-1 border rounded ${
                      item.qty === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    −
                  </button>
                  <span className="text-sm">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-6 h-6 flex items-center justify-center border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Note section */}
        <div className="flex mt-2 px-4 items-center justify-between border-t">
          <div className="p-2 ">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="2"
              className="w-full bg-white border rounded p-1 text-sm"
              placeholder="Add note for seller"
            ></textarea>
          </div>

          {/* Coupon / Discount */}
          <div className="p-2 ">
            <label className="block text-sm font-medium mb-1">Coupon</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-white border rounded p-1 text-sm"
                placeholder="Enter discount code here"
                disabled={couponApplied}
              />
              {!couponApplied ? (
                <button
                  onClick={() => {
                    // simple validation
                    if (coupon.trim() !== "") {
                      setCouponApplied(true);
                    }
                  }}
                  className="px-2 py-1 bg-[#2CC4F4] text-white rounded text-sm"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCoupon("");
                    setCouponApplied(false);
                  }}
                  className="px-2 py-1 bg-gray-300 text-black rounded text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
            {couponApplied && (
              <p className="text-xs text-green-700 mt-1">Coupon applied</p>
            )}
          </div>
        </div>

        {/* Subtotal / Total and actions */}
        <div className="p-4 border-t space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>Tk {subtotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount</span>
              <span>- Tk {discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>Tk {total.toLocaleString()}</span>
          </div>

          {/* Pay buttons */}
          <button className="w-full bg-[#2CC4F4] text-white py-2 rounded text-sm">
            Pay Online
          </button>
          <button className=""></button>
          <button
            onClick={onCODClick}
            className="w-full bg-gray-200 text-black py-2 rounded text-sm"
          >
            ক্যাশ অন ডেলিভারিতে অর্ডার করুন
          </button>
          <CashOnDeliveryModal
            open={openCOD}
            onClose={() => setOpenCOD(false)}
          />

          {/* View Cart */}
          <Link
            to="/cart"
            onClick={() => {
              setIsDrawerOpen(false); // ✅ drawer close
              // navigate("/cart"); // ✅ cart page
            }}
          >
            <button className="w-full py-2 border border-gray-400 text-sm my-2 rounded">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
