import React from "react";

import "./Message.css";

const Message = ({ message }) => {

  if (message.type === "system") {
    return (
      <div className="system-message">
        {message.text}
      </div>
    );
  }

  const isMine = message.sender === "me";

  return (
    <div
      className={`message-row ${
        isMine ? "message-mine" : "message-other"
      }`}
    >

      <div className="message-bubble">

        {/* FILE */}

        {message.file && (
          <div className="message-file">

            <span className="file-icon">
              {message.file.type?.includes("image")
                ? "🖼️"
                : "📄"}
            </span>

            <div className="file-details">

              <strong>
                {message.file.name}
              </strong>

              <span>
                {message.file.size}
              </span>

            </div>

            {message.file.url && (
              <a
                href={message.file.url}
                target="_blank"
                rel="noreferrer"
                className="file-download"
              >
                ↓
              </a>
            )}

          </div>
        )}

        {/* TEXT */}

        {message.text && (
          <div className="message-text">
            {message.text}
          </div>
        )}

        {/* TIME */}

        <div className="message-meta">

          <span>
            {message.time}
          </span>

          {isMine && (
            <span
              className={
                message.seen
                  ? "message-ticks seen"
                  : "message-ticks"
              }
            >
              ✓✓
            </span>
          )}

        </div>

      </div>

    </div>
  );
};

export default Message;