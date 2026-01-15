import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CashOnDeliveryModal from ".././Components/Modal/CashOnDeliveryModal.jsx";
import { CartContext } from "../Components/context/CartContext";

const CartPage = () => {
  const [openCOD, setOpenCOD] = useState(false);
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Subtotal calculation (decimal safe)
  const subtotal = cart.reduce((s, i) => {
    const price = parseFloat(i.price);
    return s + price * i.qty;
  }, 0);

  const discount = couponApplied && coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#2CC4F4] text-center text-white py-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">Shopping Cart</h2>
        <div className="flex justify-center gap-2 mt-1 text-xs sm:text-sm">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <span>Your Shopping Cart</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-base sm:text-lg">
            আপনার কার্ট খালি
          </p>
        ) : (
          <div className="bg-white rounded shadow p-4 sm:p-6 space-y-6">
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="w-full text-left border-collapse">
                <thead className="border-b text-gray-600">
                  <tr>
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      {/* Product */}
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 text-sm">
                        Tk {parseFloat(item.price).toFixed(2)}
                      </td>

                      {/* Quantity */}
                      <td className="py-4">
                        <div className="flex items-center gap-2 border w-fit px-2 py-1 rounded">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            disabled={item.qty === 1}
                            className={`px-2 py-1 border rounded ${
                              item.qty === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="px-2 text-lg"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="py-4 text-right font-medium">
                        Tk {(parseFloat(item.price) * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="sm:hidden space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border rounded p-3 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{item.name}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded"
                  />

                  <div className="flex justify-between text-sm">
                    <span>Price:</span>
                    <span>Tk {parseFloat(item.price).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Quantity:</span>
                    <div className="flex items-center gap-2 border w-fit px-2 py-1 rounded">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.qty === 1}
                        className={`px-2 py-1 border rounded ${
                          item.qty === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between font-medium text-sm">
                    <span>Total:</span>
                    <span>
                      Tk {(parseFloat(item.price) * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Note & Coupon */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-1">Note</label>
                <textarea
                  className="w-full bg-white border p-2 rounded resize-none"
                  placeholder="Add note for seller"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Coupon</label>
                <div className="grid gap-2">
                  <input
                    className="flex-1 bg-white border p-2 rounded"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    onClick={() => setCouponApplied(true)}
                    className="bg-[#2CC4F4] text-white w-[50%] mx-auto p-2 rounded"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && coupon === "SAVE10" && (
                  <p className="text-green-600 text-sm mt-1">
                    10% discount applied
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-4 space-y-2 text-right">
              <p className="text-sm">
                Subtotal:{" "}
                <span className="font-semibold">Tk {subtotal.toFixed(2)}</span>
              </p>

              {discount > 0 && (
                <p className="text-sm text-green-600">
                  Discount: − Tk {discount.toFixed(2)}
                </p>
              )}

              <p className="text-sm font-semibold">
                Total: Tk {total.toFixed(2)}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Taxes and shipping calculated at checkout
              </p>

              <button
                onClick={() => setOpenCOD(true)}
                className="mt-3 w-full sm:w-auto bg-[#2CC4F4] text-white px-6 py-2 rounded"
              >
                ক্যাশ অন ডেলিভারিতে অর্ডার করুন
              </button>

              <CashOnDeliveryModal
                open={openCOD}
                onClose={() => setOpenCOD(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
