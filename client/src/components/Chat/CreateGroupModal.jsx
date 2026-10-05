import React, { useRef, useState } from "react";

const CreateGroupModal = ({
  isOpen,
  onClose,
  users = [],
  onCreateGroup,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupPhoto, setGroupPhoto] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // -----------------------------
  // SELECT / UNSELECT USER
  // -----------------------------
  const toggleUser = (user) => {
    setSelectedUsers((prev) => {
      const alreadySelected = prev.some(
        (selected) => selected.id === user.id
      );

      if (alreadySelected) {
        return prev.filter((selected) => selected.id !== user.id);
      }

      return [...prev, user];
    });

    setError("");
  };

  // -----------------------------
  // GROUP PHOTO
  // -----------------------------
  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Group photo must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setGroupPhoto({
        file,
        preview: reader.result,
      });

      setError("");
    };

    reader.readAsDataURL(file);
  };

  // -----------------------------
  // CREATE GROUP
  // -----------------------------
  const handleCreateGroup = () => {
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      setError("Please enter a group name.");
      return;
    }

    if (selectedUsers.length === 0) {
      setError("Please select at least one person.");
      return;
    }

    const newGroup = {
      id: `group-${Date.now()}`,
      type: "group",
      name: trimmedName,

      photo: groupPhoto?.preview || null,

      members: selectedUsers,

      createdAt: new Date().toISOString(),

      messages: [],
    };

    // Send the newly-created group to ChatPage
    if (onCreateGroup) {
      onCreateGroup(newGroup);
    }

    // Reset modal
    setGroupName("");
    setSelectedUsers([]);
    setGroupPhoto(null);
    setError("");

    onClose();
  };

  // -----------------------------
  // CLOSE MODAL
  // -----------------------------
  const handleClose = () => {
    setGroupName("");
    setSelectedUsers([]);
    setGroupPhoto(null);
    setError("");

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-[#292463]">
              Create a Group
            </h2>

            <p className="mt-1 text-[14px] text-[#8990a8]">
              Bring your team together
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f6f7fb] text-[22px] text-[#7e849b] transition hover:bg-[#eceef8]"
          >
            ×
          </button>
        </div>

        {/* GROUP PHOTO */}
        <div className="mt-7 flex flex-col items-center">
          <div className="relative">
            {groupPhoto?.preview ? (
              <img
                src={groupPhoto.preview}
                alt="Group preview"
                className="h-[100px] w-[100px] rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#e9ecff] text-[38px] font-bold text-[#292463]">
                {groupName.trim()
                  ? groupName.trim().charAt(0).toUpperCase()
                  : "G"}
              </div>
            )}

            {/* CAMERA BUTTON */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#292463] text-[17px] text-white shadow-md transition hover:scale-105"
              title="Add group photo"
            >
              📷
            </button>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-[14px] font-semibold text-[#292463] hover:underline"
          >
            {groupPhoto ? "Change group photo" : "Add group photo"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        {/* GROUP NAME */}
        <div className="mt-7">
          <input
            type="text"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              setError("");
            }}
            placeholder="Group name"
            maxLength={50}
            className="h-[58px] w-full rounded-[17px] border border-[#e1e4ef] bg-[#f8f9fd] px-5 text-[16px] text-[#292463] outline-none transition placeholder:text-[#a4a9bb] focus:border-[#292463] focus:bg-white"
          />

          <div className="mt-1 text-right text-[11px] text-[#9ba0b2]">
            {groupName.length}/50
          </div>
        </div>

        {/* SELECT PEOPLE */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#292463]">
              Select people
            </h3>

            {selectedUsers.length > 0 && (
              <span className="rounded-full bg-[#e8ebff] px-3 py-1 text-[12px] font-semibold text-[#292463]">
                {selectedUsers.length} selected
              </span>
            )}
          </div>

          <div className="max-h-[230px] overflow-y-auto pr-1">
            {users.length === 0 ? (
              <div className="rounded-[16px] bg-[#f8f9fd] p-5 text-center text-[14px] text-[#8d93a8]">
                No people available.
              </div>
            ) : (
              users.map((user) => {
                const isSelected = selectedUsers.some(
                  (selected) => selected.id === user.id
                );

                const displayName =
                  user.name ||
                  user.username ||
                  user.fullName ||
                  "Unknown User";

                const avatar =
                  user.photo ||
                  user.profilePhoto ||
                  user.avatar ||
                  null;

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleUser(user)}
                    className={`mb-2 flex w-full items-center rounded-[16px] px-3 py-3 text-left transition ${
                      isSelected
                        ? "bg-[#f0f1ff]"
                        : "bg-transparent hover:bg-[#f7f8fc]"
                    }`}
                  >
                    {/* CHECKBOX */}
                    <div
                      className={`mr-3 flex h-5 w-5 items-center justify-center rounded-[5px] border ${
                        isSelected
                          ? "border-[#292463] bg-[#292463]"
                          : "border-[#9da2b2] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="text-[12px] font-bold text-white">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* AVATAR */}
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={displayName}
                        className="mr-3 h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#e5e9ff] text-[17px] font-bold text-[#292463]">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* NAME */}
                    <span className="text-[15px] font-semibold text-[#4a4f68]">
                      {displayName}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-[12px] bg-[#fff1f2] px-4 py-3 text-[13px] font-medium text-[#e54855]">
            {error}
          </div>
        )}

        {/* CREATE BUTTON */}
        <button
          type="button"
          onClick={handleCreateGroup}
          className="mt-6 h-[56px] w-full rounded-[17px] bg-[#292463] text-[15px] font-bold text-white shadow-sm transition hover:bg-[#211d52] active:scale-[0.99]"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;