import {
  CircleCheckBig,
  CreditCard,
  ShoppingCart,
  SquareLibrary,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import OrderTimeline from "./OrderTimeline";

function PurchaseOderPage() {
  const { orderId } = useParams();
  console.log(orderId);

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    api
      .get(`/customer/order/${orderId}`)
      .then((res) => {
        if (res.data?.success) {
          const orderData = res.data.order;
          setOrder(orderData);
          setItems(orderData.order_details || []);
          setAddress(JSON.parse(orderData.shipping_address));
        }
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-10">Order not found</div>;
  }

  return (
    <div className="my-5 px-3">
      {/* STEPS */}
      <div className="flex gap-4 md:gap-14 mx-auto justify-center flex-wrap">
        {[
          ["My Cart", ShoppingCart],
          ["Shipping info", SquareLibrary],
          ["Delivery Info", Truck],
          ["Payment", CreditCard],
          ["Confirmation", CircleCheckBig],
        ].map(([label, Icon], i) => (
          <div
            key={i}
            className={`flex flex-col border border-b-4 p-2 items-center ${
              i === 4 ? "border-black" : "border-[#2CC4F4] text-[#2CC4F4]"
            }`}
          >
            <Icon color={i === 4 ? "red" : undefined} />
            <h2 className="text-sm md:text-lg">
              {i + 1}.{label}
            </h2>
          </div>
        ))}
      </div>

      {/* THANK YOU */}
      <div className="flex flex-col gap-1 my-8 mx-auto items-center">
        <CircleCheckBig size={40} color="#2CC4F4" />
        <h2 className="text-lg font-semibold">Thank You for Your Order!</h2>
        <p className="text-sm text-gray-500">
          Your order has been placed successfully
        </p>
      </div>

      {/* ORDER SUMMARY */}
      <div className="container mx-auto">
        <div className="border w-full p-4 mb-6">
          <h3 className="border-b pb-2 font-semibold">Order Summary</h3>

          <div className="grid md:grid-cols-4 gap-4 py-4 text-sm">
            <div>
              <strong>Order date:</strong>
              <p>{new Date(order.created_at).toLocaleString()}</p>
            </div>

            <div>
              <strong>Order status:</strong>
              <p className="capitalize">{order.delivery_status}</p>
            </div>
            <div>
              <strong>Delivery Charge:</strong>
              <p>Tk {order.shipping_cost}</p>
            </div>

            <div>
              <strong>Name:</strong>
              <p>{address?.name}</p>
            </div>

            <div>
              <strong>Total amount:</strong>
              <p>Tk {order.grand_total}</p>
            </div>

            <div>
              <strong>Phone:</strong>
              <p>{address?.phone}</p>
            </div>

            <div>
              <strong>Shipping:</strong>
              <p>Flat shipping rate</p>
            </div>

            <div className="md:col-span-2">
              <strong>Shipping address:</strong>
              <p>{address?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="container mx-auto">
        <div className="border w-full p-4">
          <h3 className="border-b pb-2 font-semibold">
            Order Code: {order.code}
          </h3>

          {/* Desktop */}
          <table className="hidden md:table w-full mt-4 text-sm">
            <tbody>
              <div className="mt-6 space-y-4">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border">
                        <img
                          src={
                            item.product?.thumbnail
                              ? `https://backend.zhenaura.net/public/${item.product.thumbnail.file_name}`
                              : "/placeholder.png"
                          }
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-slate-800 text-base">
                            {item.product?.name}
                          </h4>

                          {item.product?.has_combo === 1 && (
                            <span className="px-2 py-1 text-[11px] font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                              COMBO
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 mt-1">
                          Product #{item.product_id}
                        </p>
                      </div>

                      {/* Qty */}
                      <div className="text-center">
                        <p className="text-xs text-slate-400">Quantity</p>
                        <p className="font-bold text-lg">{item.quantity}</p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Price</p>
                        <p className="font-bold text-lg text-[#2CC4F4]">
                          ৳{Number(item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </tbody>
          </table>

          {/* Mobile */}
          <div className="md:hidden space-y-4 mt-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-slate-800">
                    {item.product?.name}
                  </h4>

                  {item.product?.has_combo === 1 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Combo
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>Qty: {item.quantity}</p>
                  <p>Shipping: ৳{order.shipping_cost}</p>
                  <p className="font-semibold text-slate-900">
                    Price: ৳{Number(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-[380px] bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sub Total</span>
                  <span className="font-medium">
                    ৳
                    {(
                      Number(order.grand_total) -
                      Number(order.shipping_cost || 0)
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Tax</span>
                  <span>৳0.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span>৳{Number(order.shipping_cost).toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Coupon</span>
                  <span>৳0.00</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#2CC4F4]">
                      ৳{Number(order.grand_total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OrderTimeline status={order.delivery_status} />
        </div>
      </div>
    </div>
  );
}

export default PurchaseOderPage;
