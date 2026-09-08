import React from "react";
import "./EmptyChat.css";

const EmptyChat = () => {
  return (
    <div className="empty-chat">
      <div className="empty-chat-icon">
        💬
      </div>

      <h2>Welcome to CONEXA Chat</h2>

      <p>
        Select a conversation from the left to start chatting.
      </p>
    </div>
  );
};

export default EmptyChat;