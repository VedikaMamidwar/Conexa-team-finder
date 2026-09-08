import React from "react";
import "./TypingIndicator.css";

const TypingIndicator = ({ name = "Someone" }) => {
  return (
    <div className="typing-indicator">

      <div className="typing-avatar">
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="typing-content">

        <span className="typing-name">
          {name} is typing...
        </span>

        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
};

export default TypingIndicator;