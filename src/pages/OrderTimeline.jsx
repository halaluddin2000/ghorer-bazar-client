import { Check } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderTimeline = ({ status }) => {
  const currentStep = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-700 ease-in-out"
          style={{
            width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const completed = index <= currentStep;

          return (
            <div key={step.key} className="flex flex-col items-center w-full">
              {/* Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500
                  ${
                    completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                `}
              >
                {completed ? <Check size={18} /> : index + 1}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-sm text-center ${
                  completed ? "text-green-600" : "text-gray-400"
                }`}
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
