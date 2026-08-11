import React, { useState } from "react";
import "./ChatList.css";

const ChatList = ({ chats = [], activeChat, onSelectChat }) => {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) => {
    const name = chat?.name?.toLowerCase() || "";
    const lastMessage = chat?.lastMessage?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      lastMessage.includes(searchText)
    );
  });

  return (
    <div className="chat-list">

      {/* Header */}
      <div className="chat-list-header">
        <h2>Messages</h2>

        <button className="new-chat-btn" title="New Chat">
          +
        </button>
      </div>

      {/* Search */}
      <div className="chat-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}
      </div>

      {/* Chat List */}
      <div className="chat-items">

        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-list-item ${
                activeChat?.id === chat.id ? "active" : ""
              }`}
              onClick={() => onSelectChat?.(chat)}
            >

              {/* Avatar */}
              <div className="chat-avatar-wrapper">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="chat-avatar"
                  />
                ) : (
                  <div className="chat-avatar initials">
                    {chat.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {chat.online && (
                  <span className="online-dot"></span>
                )}
              </div>

              {/* Chat Information */}
              <div className="chat-info">

                <div className="chat-top-row">
                  <h3>{chat.name}</h3>

                  <span className="chat-time">
                    {chat.time}
                  </span>
                </div>

                <div className="chat-bottom-row">

                  <p
                    className={
                      chat.unread > 0
                        ? "last-message unread"
                        : "last-message"
                    }
                  >
                    {chat.lastMessage || "Start a conversation"}
                  </p>

                  {chat.unread > 0 && (
                    <span className="unread-count">
                      {chat.unread > 99 ? "99+" : chat.unread}
                    </span>
                  )}

                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="no-chats">
            <div className="no-chat-icon">💬</div>

            <h3>No conversations found</h3>

            <p>
              Try searching for another person.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatList;