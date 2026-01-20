import { FaComments } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "8801844545500"; // your number
  const defaultMessage = "Hello 👋 I need some information";

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      defaultMessage,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
    >
      <FaComments size={26} />
    </button>
  );
};

export default WhatsAppButton;
