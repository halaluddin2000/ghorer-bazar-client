import { ChevronDown, CircleUserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import OrderTimeline from "../../pages/OrderTimeline";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const invoiceRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const res = await api.get("/order/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data?.order) {
          setOrders(res.data.order);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const downloadInvoice = () => {
    window.print();
  };

  return (
    <div className="mt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Orders</h1>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border px-3 py-2 rounded-full"
            >
              <CircleUserRound />
              <ChevronDown />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border p-4 z-50">
                <p className="text-sm text-gray-600 mb-3">{user?.email}</p>
                <ul className="space-y-3">
                  <li className="cursor-pointer hover:text-blue-600">
                    Profile
                  </li>
                  <li className="cursor-pointer hover:text-blue-600">
                    Settings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white border rounded-xl p-10 min-h-[300px]">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-500">Go to store to place an order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 flex flex-col  items-center"
                >
                  <div className="flex flex-col w-full mb-4 justify-between">
                    <div>
                      <p>
                        <strong>Order Code:</strong> {order.code}
                      </p>
                      <p>
                        <strong>Delivery:</strong> {order.delivery_status}
                      </p>
                      <p>
                        <strong>Payment:</strong> {order.payment_status}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ৳ {order.grand_total}
                      </p>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                      >
                        Order Details
                      </button>
                    </div>
                    <span className="mt-6">
                      <OrderTimeline status={order.delivery_status} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details + Invoice */}
        {selectedOrder && (
          <div
            ref={invoiceRef}
            className="mt-10 bg-white border rounded-xl p-8 print:p-0"
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Invoice – {selectedOrder.code}
              </h2>

              <div className="flex gap-3 print:hidden">
                <button
                  onClick={downloadInvoice}
                  className="px-4 py-1 bg-green-600 text-white rounded"
                >
                  Download Invoice
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-1 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p>
                <strong>Customer:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Delivery Status:</strong>{" "}
                {selectedOrder.delivery_status}
              </p>
              <p>
                <strong>Payment Status:</strong> {selectedOrder.payment_status}
              </p>
            </div>

            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Product</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.order_details.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2 flex items-center gap-3">
                      <img
                        src={item.product?.thumbnail_image}
                        alt=""
                        className="w-14 h-14 object-cover rounded"
                      />
                      {item.product?.name}
                    </td>
                    <td className="border p-2 text-center">{item.quantity}</td>
                    <td className="border p-2 text-center">৳ {item.price}</td>
                    <td className="border p-2 text-center">
                      ৳ {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-6 text-lg font-bold">
              Grand Total: ৳ {selectedOrder.grand_total}
            </div>
          </div>
        )}
      </div>

      {/* Print styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print\\:hidden {
              display: none;
            }
            [ref] {
              visibility: visible;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
