import { Check } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const IMAGE_BASE_URL = "https://zhennatural.com";

const OrderTimeline = ({ status, products = [] }) => {
  const normalizedStatus = status?.toLowerCase();
  const currentStep = STEPS.findIndex((s) => s.key === normalizedStatus);
  const firstProduct = products?.[0];

  return (
    <div className="w-full">
      {/* Product List */}
      <div className="mb-8 space-y-4">
        {products.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-6">
            <img
              src={`${IMAGE_BASE_URL}/${item?.product?.thumbnail?.file_name}`}
              alt={item.product.name}
              className="w-20 h-20 rounded-lg border object-cover"
            />

            <div>
              <h3 className="font-semibold">{firstProduct?.product?.name}</h3>

              {products.length > 1 && (
                <p className="text-sm text-gray-500">
                  + {products.length - 1} more items
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-700"
          style={{
            width:
              currentStep >= 0
                ? `${(currentStep / (STEPS.length - 1)) * 100}%`
                : "0%",
          }}
        />
      </div>

      {/* Timeline Steps */}
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const completed = index <= currentStep;

          return (
            <div key={step.key} className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2
                ${
                  completed
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {completed ? <Check size={18} /> : index + 1}
              </div>

              <p
                className={`mt-2 text-sm text-center font-medium
                ${completed ? "text-blue-600" : "text-gray-400"}`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
