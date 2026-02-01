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
            <thead>
              <tr className="border-b">
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Delivery</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className="border-b">
                  <td>{i + 1}</td>
                  <td>{item.product?.name}</td>
                  <td>{item.quantity}</td>
                  <td>Home Delivery</td>
                  <td>Tk {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile */}
          <div className="md:hidden space-y-3 mt-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded p-3 text-sm">
                <p className="font-semibold">{item.product?.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Delivery: Home Delivery</p>
                <p>Price: Tk {item.price}</p>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-end font-semibold mt-4">
            Grand Total: Tk {order.grand_total}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseOderPage;
