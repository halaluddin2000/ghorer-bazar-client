"use client";

// import OrderTimeline from "@/components/OrderTimeline"; // adjust path if needed
import { useState } from "react";
import api from "../api/axios";
import OrderTimeline from "./OrderTimeline";

const TrackOrder = () => {
  const [orderCode, setOrderCode] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    if (!orderCode) {
      setError("Please enter your order code");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrderData(null);

      const res = await api.get("/track-your-order", {
        params: { order_code: orderCode }, // query parameter হিসেবে যাবে
      });

      // axios response data directly এখানে থাকে
      setOrderData(res.data);
      setOrderCode("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Order not found or server error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Check Your Order Status
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter your order code"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            className="flex-1 border bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleTrackOrder}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
        )}

        {/* Order Result Section */}
        {orderData && (
          <div className="mt-10">
            <div className="mb-6 text-center">
              <h2 className="text-lg font-semibold">
                Order Code:{" "}
                <span className="text-blue-600">{orderData.order.code}</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Current Status: {orderData.order.delivery_status}
              </p>
            </div>

            {/* Timeline */}
            <OrderTimeline status={orderData.order.delivery_status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
