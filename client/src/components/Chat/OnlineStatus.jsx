import React from "react";

const OnlineStatus = ({ online }) => {
  return (
    <div className="online-status">
      <span className={online ? "status-dot online" : "status-dot offline"}></span>

      <span className="status-text">
        {online ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default OnlineStatus;