import React, { useState } from "react";

import ChatList from "../../components/Chat/ChatList";
import ChatWindow from "../../components/Chat/ChatWindow";

import "./ChatPage.css";

const ChatPage = () => {
  // Temporary chat data
  // Later this will come from your backend/database
  const [chats] = useState([
    {
      id: 1,
      name: "Vedika Mamidwar",
      avatar: "",
      lastMessage: "Hey! Are you joining the team?",
      time: "2:35 PM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Rahul Sharma",
      avatar: "",
      lastMessage: "Let's discuss the project.",
      time: "1:20 PM",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Priya Patil",
      avatar: "",
      lastMessage: "Can you share the document?",
      time: "Yesterday",
      unread: 5,
      online: false,
    },
  ]);

  // Currently selected chat
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="chat-page">

      {/* Left side - Chat List */}
      <div className="chat-sidebar">
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
      </div>

      {/* Right side - Chat Window */}
      <div className="chat-main">
        {activeChat ? (
          <ChatWindow chat={activeChat} />
        ) : (
          <div className="empty-chat">
            <div className="empty-chat-icon">💬</div>

            <h2>Welcome to CONEXA Chat</h2>

            <p>
              Select a conversation to start chatting.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ChatPage;