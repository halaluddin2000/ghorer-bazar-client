import Hero from "../Components/home/Hero";

function ReturnsPolicy() {
  return (
    <div>
      <Hero />
      <div className="grid mx-auto  font-semibold w-[60%]">
        <h2 className="border-b mt-5 py-6">Return & Refund Policy</h2>
        <ul className="mt-4 pl-5 list-disc space-y-3">
          <p className="py-2">
            <span className="text-green-400">Last Updated: [01-01-2026]</span>
            <br />
            At Zhen Aura, customer satisfaction is our priority. We ensure
            transparency and fairness in all return and refund matters, in
            accordance with applicable laws of Bangladesh.
          </p>
          <h2 className="-ml-5">Eligibility for Return</h2>
          <p>
            Due to the nature of organic and food products, returns are accepted
            only under the following conditions:
          </p>
          <li className="mt-5">
            The product is damaged, spoiled, or defective at the time of
            delivery
          </li>
          <li>
            The product delivered is incorrect or mismatched with the order
          </li>
          <li>
            The issue is reported within 24 hours of receiving the product
          </li>
          <li>
            The product is unused, unopened, and in original packaging (where
            applicable)
          </li>
          <p>
            ⚠️ Perishable food items are non-returnable once opened, except in
            case of quality or safety issues.
          </p>
          <h2 className="-ml-6 text-green-500">Non-Returnable Items</h2>
          <p>Returns will not be accepted for:</p>
          <li>Opened or partially consumed food items</li>
          <li>Products damaged due to improper storage by the customer</li>
          <li>Change of mind after delivery</li>
          <li>
            Items purchased during discounts, promotions, or clearance sales
          </li>
          <li>
            Orders with incorrect delivery information provided by the customer
          </li>

          <h2 className="-ml-6 text-green-500">Return Process</h2>
          <p>To request a return, please follow these steps:</p>
          <li>Contact our customer support via phone, WhatsApp, or email</li>
          <li>Provide your order number, product photos, and issue details</li>
          <li>Our team will review and respond within 1–2 business days</li>
          <li>
            If approved, we will arrange return pickup or provide instructions
          </li>
          <h2 className="-ml-6 text-green-500">Refund Policy</h2>

          <li>Approved refunds will be processed within 7–10 working days</li>
          <li>
            Refunds will be issued via the original payment method (bKash,
            Nagad, Rocket, bank transfer, or card)
          </li>
          <li>
            For Cash on Delivery (COD) orders, refunds will be sent via mobile
            banking or bank transfer
          </li>
          <li>
            Delivery charges are non-refundable, unless the error occurred from
            our side
          </li>

          <h2 className="-ml-6 text-green-500">Replacement Option</h2>
          <p>
            Instead of a refund, customers may choose a replacement product,
            subject to availability.
          </p>

          <h2 className="-ml-6 text-green-500">Order Cancellation</h2>
          <li>Orders can be cancelled before dispatch only</li>
          <li>Once shipped, cancellation requests will not be accepted</li>
          <h2 className="-ml-6 text-green-500">Contact Information</h2>
          <p>For any return or refund-related queries, please contact:</p>
          <h3>Zhen Aura Customer Support</h3>
          <p>Address: 427, Tejgaon Industrial Area, Dhaka-1208, Bangladesh.</p>
          <p>Call Us: +8801844545500</p>
          <p>Email: info@zhenaura.net</p>
          <h2 className="-ml-6 text-green-500">Legal Compliance</h2>
          <p className="font-medium">
            This policy is governed by the{" "}
            <span className="font-bold">
              laws of the People’s Republic of Bangladesh.
            </span>{" "}
            Zhen Aura reserves the right to update or modify this policy at any
            time without prior notice.
          </p>
        </ul>
      </div>
    </div>
  );
}

export default ReturnsPolicy;
