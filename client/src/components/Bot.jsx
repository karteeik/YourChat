import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:1900/bot/v1/message", {
        text: input,
      });

      setMessages((prev) => [
        ...prev,
        { text: input, sender: "user" },
        { text: res.data.botMessage, sender: "bot" },
      ]);
    } catch (error) {
      console.log("Error Sending Message", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    // Nav Bar
    <>
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Your Chat
            </h1>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <FaUserCircle
                size={36}
                className="text-white cursor-pointer hover:text-teal-400 transition duration-200"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            // welcome app
            <div className="flex-1 pb-10 pt-20 flex items-center justify-center">
              <div className="text-center text-gray-400 font-semibold text-3xl">
                Hi, I'm{" "}
                <span className="text-green-500 font-bold">Your Chat</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white self-end"
                      : "bg-gray-800 text-gray-100 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
                  Bot is typing...
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 p-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Input */}
          <input
            type="text"
            placeholder="Ask YourChat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          {/* Button */}
          <button
            onClick={handleSendMessage}
            className="px-5 py-2 rounded-xl bg-linear-to-r from-blue-500 via-teal-400 to-green-400 text-white font-medium hover:opacity-90 transition cursor-pointer"
          >
            Send
          </button>
        </div>
      </footer>
    </>
  );
};

export default Bot;
