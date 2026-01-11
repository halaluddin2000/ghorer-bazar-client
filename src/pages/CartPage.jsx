import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CashOnDeliveryModal from ".././Components/Modal/CashOnDeliveryModal.jsx";
import { CartContext } from "../Components/context/CartContext";

const CartPage = ({ onCODClick }) => {
  const [openCOD, setOpenCOD] = useState(false);
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const discount = couponApplied && coupon === "SAVE10" ? subtotal * 0.1 : 0;

  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      {/* Header */}
      <div className="bg-[#8EC644] text-center text-white py-6">
        <h2 className="text-4xl font-semibold">Shopping Cart</h2>
        <div className="flex justify-center gap-2 mt-2 text-sm">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <span>Your Shopping Cart</span>
        </div>
      </div>

      {/* Cart Table */}
      <div className="container mx-auto px-4 py-10">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">আপনার কার্ট খালি</p>
        ) : (
          <div className="bg-white rounded shadow p-6">
            <table className="w-full text-left border-collapse">
              <thead className="border-b">
                <tr className="text-sm text-gray-600">
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
                      Tk {item.price.toLocaleString()}
                    </td>

                    {/* Quantity */}
                    <td className="py-4">
                      <div className="flex items-center gap-2 border w-fit px-2 py-1 rounded">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-2 text-lg"
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
                      Tk {(item.price * item.qty).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Note & Coupon */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Note */}
              <div>
                <label className="block font-medium mb-2">Note</label>
                <textarea
                  className="w-full bg-white border p-2 rounded"
                  placeholder="Add note for seller"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Coupon */}
              <div>
                <label className="block font-medium mb-2">Coupon</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white border p-2 rounded"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    onClick={() => setCouponApplied(true)}
                    className="bg-[#8EC644] text-white px-4 rounded"
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
            <div className="mt-8 border-t pt-6 text-right">
              <p className="text-sm">
                Subtotal:{" "}
                <span className="font-semibold">
                  Tk {subtotal.toLocaleString()}
                </span>
              </p>

              {discount > 0 && (
                <p className="text-sm text-green-600">
                  Discount: − Tk {discount.toLocaleString()}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Taxes and shipping calculated at checkout
              </p>

              <button
                onClick={onCODClick}
                className="mt-4 bg-[#8EC644] text-white px-6 py-3 rounded"
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
