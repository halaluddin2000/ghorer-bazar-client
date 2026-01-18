import { useState } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello 👋 How can we help you?" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { from: "user", text: message }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for your message 😊" },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-[#2CC4F4] text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        {open ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#2CC4F4] text-white p-4 rounded-t-xl font-semibold">
            Live Chat
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] p-2 rounded-lg text-sm ${
                  msg.from === "user"
                    ? "bg-[#2CC4F4] text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white border rounded px-3 py-2 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-[#2CC4F4] text-white p-2 rounded"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
