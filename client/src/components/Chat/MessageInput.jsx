import React, { useRef, useState } from "react";

import "./MessageInput.css";

const emojis = [
  "😀",
  "😂",
  "😍",
  "😊",
  "🥰",
  "😎",
  "😭",
  "😡",
  "👍",
  "👏",
  "❤️",
  "🔥",
  "🎉",
  "🚀",
  "💯",
  "🙌",
];

const MessageInput = ({
  onSendMessage,
  onTyping,
}) => {

  const [message, setMessage] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const fileInputRef = useRef(null);

  const handleSend = () => {

    if (!message.trim()) return;

    onSendMessage({
      type: "text",
      text: message.trim(),
    });

    setMessage("");

    onTyping?.(false);
  };

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setMessage((previous) =>
      previous + emoji
    );
  };

  const handleFileChange = (event) => {

    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      onSendMessage({
        type: "file",
        text: "",
        file: {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          url: reader.result,
        },
      });

    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return (
    <div className="message-input-wrapper">

      {showEmojiPicker && (
        <div className="emoji-picker">

          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => addEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}

        </div>
      )}

      <div className="message-input-container">

        {/* EMOJI */}

        <button
          type="button"
          className="input-action-btn"
          onClick={() =>
            setShowEmojiPicker(
              (previous) => !previous
            )
          }
          title="Emoji"
        >
          😊
        </button>

        {/* FILE */}

        <button
          type="button"
          className="input-action-btn"
          onClick={() =>
            fileInputRef.current?.click()
          }
          title="Attach"
        >
          📎
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="
            image/*,
            application/pdf,
            .doc,
            .docx,
            .xls,
            .xlsx,
            .ppt,
            .pptx,
            .txt
          "
          onChange={handleFileChange}
        />

        {/* MESSAGE */}

        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);

            onTyping?.(
              event.target.value.length > 0
            );
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
        />

        {/* SEND */}

        <button
          type="button"
          className="send-message-btn"
          onClick={handleSend}
          disabled={!message.trim()}
          title="Send"
        >
          ➤
        </button>

      </div>
    </div>
  );
};

const formatFileSize = (bytes) => {

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default MessageInput;