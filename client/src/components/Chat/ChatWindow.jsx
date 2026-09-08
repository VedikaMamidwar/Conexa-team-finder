import React, { useState } from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import OnlineStatus from "./OnlineStatus";
import TypingIndicator from "./TypingIndicator";

import "./ChatWindow.css";

const ChatWindow = ({
  chat,
  messages = [],
  onSendMessage,
  onExitGroup,
  onDeleteChat,
  onUpdateProfile,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isGroup = chat?.type === "group";

  // Voice call
  const handleCall = () => {
    if (!chat?.phone) {
      alert("Phone number is not available.");
      return;
    }

    window.location.href = `tel:${chat.phone}`;
  };

  // Video call
  const handleVideoCall = () => {
    const roomName = `CONEXA-${chat.id}`;

    window.open(
      `https://meet.jit.si/${roomName}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Update profile
  const handleUpdateProfile = () => {
    setShowMenu(false);

    if (onUpdateProfile) {
      onUpdateProfile(chat);
      return;
    }

    alert("Update Profile feature is ready to connect.");
  };

  // Exit group
  const handleExitGroup = () => {
    setShowMenu(false);

    const confirmed = window.confirm(
      `Are you sure you want to exit "${chat?.name}"?`
    );

    if (!confirmed) return;

    onExitGroup?.(chat);
  };

  // Delete group/chat
  const handleDelete = () => {
    setShowMenu(false);

    const itemName = chat?.name || "this conversation";

    const confirmed = window.confirm(
      `Are you sure you want to delete "${itemName}"?`
    );

    if (!confirmed) return;

    onDeleteChat?.(chat);
  };

  return (
    <div className="chat-window">

      {/* =================================
          HEADER
      ================================= */}

      <div className="chat-window-header">

        <div className="chat-user-info">

          <div className="chat-window-avatar-wrapper">

            {chat?.avatar ? (
              <img
                src={chat.avatar}
                alt={chat.name}
                className="chat-window-avatar"
              />
            ) : (
              <div className="chat-window-avatar initials">
                {chat?.type === "group"
                  ? "👥"
                  : chat?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
              </div>
            )}

            {chat?.online && chat?.type !== "group" && (
              <span className="header-online-dot" />
            )}

          </div>


          <div className="chat-user-details">

            <h3>{chat?.name}</h3>

            {isGroup ? (
              <span className="group-members">
                {chat?.members?.length || 0} members
              </span>
            ) : (
              <>
                <OnlineStatus online={chat?.online} />

                <span className="phone-number">
                  {chat?.phone}
                </span>
              </>
            )}

          </div>

        </div>


        {/* =================================
            HEADER ACTIONS
        ================================= */}

        <div className="chat-header-actions">

          {/* CALL */}
          <button
            className="header-action-btn"
            title="Voice call"
            onClick={handleCall}
          >
            📞
          </button>


          {/* VIDEO CALL */}
          <button
            className="header-action-btn"
            title="Video call"
            onClick={handleVideoCall}
          >
            🎥
          </button>


          {/* SEARCH */}
          <button
            className="header-action-btn"
            title="Search"
          >
            🔍
          </button>


          {/* THREE DOT */}
          <div className="more-menu-wrapper">

            <button
              className={`header-action-btn ${
                showMenu ? "menu-open" : ""
              }`}
              title="More options"
              onClick={() =>
                setShowMenu((previous) => !previous)
              }
            >
              ⋮
            </button>


            {/* =================================
                MORE MENU
            ================================= */}

            {showMenu && (
              <div className="chat-more-menu">

                {/* UPDATE PROFILE */}
                <button
                  className="chat-menu-item"
                  onClick={handleUpdateProfile}
                >
                  <span className="menu-icon">
                    ✏️
                  </span>

                  <span>
                    Update Profile
                  </span>
                </button>


                {/* GROUP ONLY */}
                {isGroup && (
                  <button
                    className="chat-menu-item exit-item"
                    onClick={handleExitGroup}
                  >
                    <span className="menu-icon">
                      🚪
                    </span>

                    <span>
                      Exit Group
                    </span>
                  </button>
                )}


                {/* DELETE */}
                <button
                  className="chat-menu-item delete-item"
                  onClick={handleDelete}
                >
                  <span className="menu-icon">
                    🗑️
                  </span>

                  <span>
                    {isGroup
                      ? "Delete Group"
                      : "Delete Chat"}
                  </span>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =================================
          MESSAGES
      ================================= */}

      <div className="messages-container">

        <MessageList messages={messages} />

        {isTyping && (
          <TypingIndicator
            name={chat?.name}
          />
        )}

      </div>


      {/* =================================
          MESSAGE INPUT
      ================================= */}

      <MessageInput
        onSendMessage={onSendMessage}
        onTyping={setIsTyping}
      />

    </div>
  );
};

export default ChatWindow;