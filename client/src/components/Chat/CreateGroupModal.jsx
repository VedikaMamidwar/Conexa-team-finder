import React, { useState } from "react";
import "./CreateGroupModal.css";

const CreateGroupModal = ({
  users = [],
  onClose,
  onCreate,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupPhoto, setGroupPhoto] = useState("");

  // Select / unselect a user
  const toggleUser = (user) => {
    setSelectedUsers((previous) => {
      const alreadySelected = previous.some(
        (item) => item.id === user.id
      );

      if (alreadySelected) {
        return previous.filter(
          (item) => item.id !== user.id
        );
      }

      return [...previous, user];
    });
  };

  // Upload group photo
  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setGroupPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Create group
  const handleCreate = () => {
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      alert("Please enter a group name.");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one member.");
      return;
    }

    const group = {
      name: trimmedName,
      avatar: groupPhoto,
      members: selectedUsers,
    };

    onCreate?.(group);
  };

  return (
    <div
      className="group-modal-overlay"
      onClick={onClose}
    >
      <div
        className="group-modal"
        onClick={(event) => event.stopPropagation()}
      >

        {/* HEADER */}
        <div className="group-modal-header">
          <h2>Create Group</h2>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            ×
          </button>
        </div>


        {/* GROUP PHOTO */}
        <div className="group-photo-section">

          <label
            className="group-photo"
            title="Add group photo"
          >
            {groupPhoto ? (
              <img
                src={groupPhoto}
                alt="Group"
              />
            ) : (
              <span>📷</span>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>

          <span>Add group photo</span>

        </div>


        {/* GROUP NAME */}
        <input
          className="group-name-input"
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(event) =>
            setGroupName(event.target.value)
          }
          maxLength={50}
        />


        {/* MEMBERS TITLE */}
        <h3>
          Add members
          {selectedUsers.length > 0 && (
            <span
              style={{
                marginLeft: "6px",
                color: "#7c3aed",
              }}
            >
              ({selectedUsers.length})
            </span>
          )}
        </h3>


        {/* USERS */}
        <div className="group-user-list">

          {users.length === 0 ? (
            <div className="no-group-users">
              <p>No users available.</p>
            </div>
          ) : (
            users.map((user) => {

              const userId = user.id || user._id;

              const selected = selectedUsers.some(
                (item) =>
                  (item.id || item._id) === userId
              );

              return (
                <button
                  key={userId}
                  type="button"
                  className={`group-user ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() =>
                    toggleUser(user)
                  }
                >

                  {/* USER AVATAR */}
                  <div className="group-user-avatar">

                    {user.avatar ||
                    user.profilePhoto ||
                    user.photo ? (
                      <img
                        src={
                          user.avatar ||
                          user.profilePhoto ||
                          user.photo
                        }
                        alt={user.name}
                      />
                    ) : (
                      user.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"
                    )}

                  </div>


                  {/* USER DETAILS */}
                  <div className="group-user-info">

                    <strong>
                      {user.name || "Unknown User"}
                    </strong>

                    {user.phone && (
                      <span>
                        {user.phone}
                      </span>
                    )}

                  </div>


                  {/* SELECT CIRCLE */}
                  <div className="selection-circle">
                    {selected && "✓"}
                  </div>

                </button>
              );
            })
          )}

        </div>


        {/* CREATE BUTTON */}
        <button
          type="button"
          className="create-group-btn"
          onClick={handleCreate}
        >
          Create Group
        </button>

      </div>
    </div>
  );
};

export default CreateGroupModal;