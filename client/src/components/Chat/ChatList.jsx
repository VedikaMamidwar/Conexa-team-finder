import React, { useMemo, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import "./ChatList.css";

const ChatList = ({
  chats = [],
  activeChat,
  onSelectChat,
  users = [],
  onCreateGroup,
  theme = "light",
  setTheme,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showGroupForm, setShowGroupForm] = useState(false);

  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      const matchesSearch = chat.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || chat.type === "group";

      return matchesSearch && matchesFilter;
    });
  }, [chats, search, filter]);

  const handleCreateGroup = (group) => {
    onCreateGroup?.(group);
    setShowGroupForm(false);
  };

  const toggleTheme = () => {
    setTheme?.(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`chat-list ${theme}`}>

      {/* HEADER */}
      <div className="chat-list-header">
        <div>
          <h1>Chats</h1>

          <p>
            {chats.length}{" "}
            {chats.length === 1
              ? "conversation"
              : "conversations"}
          </p>
        </div>

        <div className="chat-header-buttons">

          {/* THEME BUTTON */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >
            {theme === "light" ? "☾" : "☀"}
          </button>

          {/* CREATE GROUP */}
          <button
            className="new-chat-btn"
            onClick={() => setShowGroupForm(true)}
            title="Create group"
          >
            +
          </button>

        </div>
      </div>

      {/* SEARCH */}
      <div className="chat-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {/* FILTERS */}
      <div className="chat-filters">

        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "group" ? "active" : ""}
          onClick={() => setFilter("group")}
        >
          Groups
        </button>

      </div>

      {/* CHAT LIST */}
      <div className="chat-items">

        {filteredChats.length === 0 ? (
          <div className="no-chats">
            <div className="no-chat-icon">
              💬
            </div>

            <p>No conversations found</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`chat-item ${
                activeChat?.id === chat.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onSelectChat?.(chat)
              }
            >

              {/* AVATAR */}
              <div className="chat-avatar">

                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                  />
                ) : chat.type === "group" ? (
                  <span className="group-avatar">
                    👥
                  </span>
                ) : (
                  <span>
                    {chat.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </span>
                )}

                {chat.type !== "group" &&
                  chat.online && (
                    <span className="online-dot" />
                  )}

              </div>

              {/* CHAT INFO */}
              <div className="chat-info">

                <div className="chat-top-row">

                  <h3>{chat.name}</h3>

                  <span className="chat-time">
                    {chat.time}
                  </span>

                </div>

                <div className="chat-bottom-row">

                  <p className="chat-last-message">

                    {chat.type === "group" && (
                      <span className="group-label">
                        Group ·{" "}
                      </span>
                    )}

                    {chat.lastMessage ||
                      "No messages yet"}

                  </p>

                  {chat.unread > 0 && (
                    <span className="unread-count">
                      {chat.unread}
                    </span>
                  )}

                </div>

              </div>

            </button>
          ))
        )}

      </div>

      {/* GROUP MODAL */}
      {showGroupForm && (
        <CreateGroupModal
          users={users}
          onClose={() =>
            setShowGroupForm(false)
          }
          onCreate={handleCreateGroup}
        />
      )}

    </div>
  );
};

export default ChatList;