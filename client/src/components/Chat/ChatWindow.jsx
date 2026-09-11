import React, { useState } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ chat }) => {
  const [message, setMessage] = useState("");

  // Temporary messages
  // Later these will come from your backend
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hey! Are you joining the team?",
      time: "2:35 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "Yes! I'm interested in joining.",
      time: "2:36 PM",
    },
    {
      id: 3,
      sender: "other",
      text: "Great! Let's discuss the project.",
      time: "2:37 PM",
    },
  ]);

  // Send message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
    ]);

    setMessage("");
  };

  // Send message when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-window">

      {/* ================= HEADER ================= */}
      <div className="chat-window-header">

        <div className="chat-user-info">

          {/* Avatar */}
          {chat?.avatar ? (
            <img
              src={chat.avatar}
              alt={chat.name}
              className="chat-window-avatar"
            />
          ) : (
            <div className="chat-window-avatar initials">
              {chat?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div>
            <h3>{chat?.name}</h3>

            <span
              className={
                chat?.online
                  ? "user-status online"
                  : "user-status offline"
              }
            >
              {chat?.online ? "Online" : "Offline"}
            </span>
          </div>

        </div>

        {/* Header buttons */}
        <div className="chat-header-actions">

          <button
            className="header-action-btn"
            title="Search"
          >
            🔍
          </button>

          <button
            className="header-action-btn"
            title="More options"
          >
            ⋮
          </button>

        </div>

      </div>


      {/* ================= MESSAGES ================= */}
      <div className="messages-container">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-wrapper ${
              msg.sender === "me"
                ? "sent"
                : "received"
            }`}
          >

            <div className="message-bubble">

              <p>{msg.text}</p>

              <span className="message-time">
                {msg.time}
              </span>

            </div>

          </div>
        ))}

      </div>


      {/* ================= INPUT ================= */}
      <div className="message-input-container">

        <button
          className="input-action-btn"
          title="Emoji"
        >
          😊
        </button>

        <button
          className="input-action-btn"
          title="Attach file"
        >
          📎
        </button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows="1"
        />

        <button
          className="send-message-btn"
          onClick={handleSendMessage}
          disabled={!message.trim()}
          title="Send message"
        >
          ➤
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;