import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "./MessageList.css";

const MessageList = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="message-list empty-message-list">
        <p>No messages yet.</p>
        <span>Start the conversation 👋</span>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;