import React, { useMemo, useRef, useState } from "react";
import CreateGroupModal from "../../components/Chat/CreateGroupModal";

const CURRENT_USER = {
  id: "me",
  name: "Yuvanshi Jadhav",
  avatar: "Y",
};

const initialChats = [
  {
    id: 1,
    type: "direct",
    name: "Vedika Mamidwar",
    avatar: "V",
    status: "Online",
    online: true,
    unread: 2,
    time: "2:35 PM",
    messages: [
      {
        id: 1,
        sender: "Vedika Mamidwar",
        text: "Hey! Are you working on the CONEXA project?",
        time: "2:30 PM",
        own: false,
      },
      {
        id: 2,
        sender: "Yuvanshi Jadhav",
        text: "Yes! I'm currently working on the chat section.",
        time: "2:32 PM",
        own: true,
      },
      {
        id: 3,
        sender: "Vedika Mamidwar",
        text: "That's great! Let me know if you need any help.",
        time: "2:35 PM",
        own: false,
      },
    ],
  },
  {
    id: 2,
    type: "direct",
    name: "Rahul Sharma",
    avatar: "R",
    status: "Online",
    online: true,
    unread: 0,
    time: "1:15 PM",
    messages: [
      {
        id: 1,
        sender: "Rahul Sharma",
        text: "Did you check the latest changes?",
        time: "1:10 PM",
        own: false,
      },
      {
        id: 2,
        sender: "Yuvanshi Jadhav",
        text: "Yes, everything looks good.",
        time: "1:15 PM",
        own: true,
      },
    ],
  },
  {
    id: 3,
    type: "direct",
    name: "Priya Patil",
    avatar: "P",
    status: "Offline",
    online: false,
    unread: 5,
    time: "12:45 PM",
    messages: [
      {
        id: 1,
        sender: "Priya Patil",
        text: "Can we discuss the project tomorrow?",
        time: "12:45 PM",
        own: false,
      },
    ],
  },
  {
    id: 4,
    type: "direct",
    name: "Aman Singh",
    avatar: "A",
    status: "Online",
    online: true,
    unread: 0,
    time: "Yesterday",
    messages: [
      {
        id: 1,
        sender: "Aman Singh",
        text: "The presentation is ready.",
        time: "Yesterday",
        own: false,
      },
    ],
  },
];

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

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </>
    ),

    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),

    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    ),

    video: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </>
    ),

    paperclip: (
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    ),

    smile: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </>
    ),

    send: (
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    ),

    moon: (
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    ),

    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </>
    ),

    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
      </>
    ),

    logOut: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),

    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),

    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),

    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),

    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="11" x2="12" y2="16" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),

    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),

    check: <polyline points="20 6 9 17 4 12" />,

    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

const Avatar = ({
  name,
  avatar,
  photo,
  size = "md",
  online = false,
  darkMode = false,
}) => {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-14 w-14 text-lg",
  };

  return (
    <div className="relative shrink-0">
      <div
        className={`${sizes[size]} flex items-center justify-center overflow-hidden rounded-full font-semibold ${
          darkMode
            ? "bg-[#2e2a45] text-[#c8c1ff]"
            : "bg-[#eeeaf8] text-[#4B3F8F]"
        }`}
      >
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          avatar || name?.charAt(0)?.toUpperCase()
        )}
      </div>

      {online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#48c774]" />
      )}
    </div>
  );
};

const Modal = ({ children, onClose, darkMode }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className={`w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl ${
          darkMode
            ? "border-white/10 bg-[#17152a] text-white"
            : "border-[#ebe9f7] bg-white text-[#24213d]"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const SectionTitle = ({ children, darkMode }) => (
  <div
    className={`px-5 pb-2 pt-4 text-[11px] font-bold uppercase tracking-[0.14em] ${
      darkMode ? "text-white/40" : "text-[#9893ad]"
    }`}
  >
    {children}
  </div>
);

const ChatPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(
    initialChats[0]?.id ?? null
  );
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showUpdateGroup, setShowUpdateGroup] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showGroupMedia, setShowGroupMedia] = useState(false);

  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState(null);
  const [selectedNewMembers, setSelectedNewMembers] = useState([]);

  const [profilePhoto, setProfilePhoto] = useState(null);

  const messageFile = useRef(null);
  const groupPhoto = useRef(null);
  const profilePhotoInput = useRef(null);
  const messagesEnd = useRef(null);

  const selectedChat = chats.find(
    (chat) => chat.id === selectedId
  );

  const availableUsers = chats.filter(
    (chat) => chat.type !== "group"
  );

  /*
    LIGHT MODE:
    Deep purple = #4B3F8F

    DARK MODE:
    Existing purple = #7667e8
  */

  const accentText = darkMode
    ? "text-[#7667e8]"
    : "text-[#4B3F8F]";

  const accentBg = darkMode
    ? "bg-[#7667e8]"
    : "bg-[#4B3F8F]";

  const accentShadow = darkMode
    ? "shadow-[#7667e8]/20"
    : "shadow-[#4B3F8F]/20";

  const theme = {
    page: darkMode
      ? "bg-[#0e0d18] text-white"
      : "bg-[#f7f6fc] text-[#24213d]",

    sidebar: darkMode
      ? "bg-[#141220] border-white/10"
      : "bg-white border-[#ebe9f7]",

    card: darkMode
      ? "bg-[#191725] border-white/10"
      : "bg-white border-[#ebe9f7]",

    muted: darkMode
      ? "text-white/45"
      : "text-[#918da4]",

    input: darkMode
      ? "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25"
      : "bg-[#faf9fe] border-[#ebe9f7] text-[#24213d] placeholder:text-[#aaa6b8]",

    hover: darkMode
      ? "hover:bg-white/[0.05]"
      : "hover:bg-[#f7f5ff]",

    active: darkMode
      ? "bg-[#7667e8]/15 border-[#7667e8]/20"
      : "bg-[#F0EDFF] border-[#DCD5FF]",
  };

  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      const matchesSearch = chat.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "direct") {
        return chat.type === "direct";
      }

      if (filter === "group") {
        return chat.type === "group";
      }

      return true;
    });
  }, [chats, search, filter]);

  React.useEffect(() => {
    messagesEnd.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedChat?.messages]);

  React.useEffect(() => {
    const handleOutsideClick = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, [showMenu]);

  const selectChat = (id) => {
    setSelectedId(id);

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? { ...chat, unread: 0 }
          : chat
      )
    );
  };

  /* =========================
     CREATE GROUP
  ========================= */

  const handleCreateGroup = (newGroup = {}) => {
    const members =
      newGroup.members ||
      newGroup.selectedUsers ||
      [];

    const group = {
      id: `group-${Date.now()}`,
      type: "group",
      name: newGroup.name || "New Group",

      avatar:
        newGroup.avatar ||
        newGroup.name?.charAt(0)?.toUpperCase() ||
        "G",

      photo:
        newGroup.photo ||
        newGroup.groupPhoto ||
        null,

      description: newGroup.description || "",
      status: "Group",
      online: false,
      unread: 0,
      time: "Now",
      messages: [],
      members,
      createdAt: new Date().toISOString(),
    };

    setChats((prev) => [group, ...prev]);
    setSelectedId(group.id);
    setShowCreateGroup(false);
    setShowMenu(false);
  };

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: CURRENT_USER.name,
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      own: true,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [
                ...(chat.messages || []),
                newMessage,
              ],
              time: newMessage.time,
            }
          : chat
      )
    );

    setMessage("");
  };

  const insertEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
  };

  /* =========================
     FILE / IMAGE
  ========================= */

  const handleFile = (event) => {
    const file = event.target.files?.[0];

    if (!file || !selectedChat) return;

    const url = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");

    const newMessage = {
      id: Date.now(),
      sender: CURRENT_USER.name,
      text: "",
      fileName: file.name,
      fileUrl: url,
      fileType: file.type,
      image: isImage ? url : null,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      own: true,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [
                ...(chat.messages || []),
                newMessage,
              ],
              time: newMessage.time,
            }
          : chat
      )
    );

    event.target.value = "";
  };

  /* =========================
     DELETE / EXIT
  ========================= */

  const deleteConversation = () => {
    if (!selectedChat) return;

    const confirmed = window.confirm(
      `Delete "${selectedChat.name}"?`
    );

    if (!confirmed) return;

    setChats((prev) =>
      prev.filter(
        (chat) => chat.id !== selectedChat.id
      )
    );

    setSelectedId(null);
    setShowMenu(false);
  };

  const exitGroup = () => {
    if (
      !selectedChat ||
      selectedChat.type !== "group"
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Exit "${selectedChat.name}"?`
    );

    if (!confirmed) return;

    setChats((prev) =>
      prev.filter(
        (chat) => chat.id !== selectedChat.id
      )
    );

    setSelectedId(null);
    setShowMenu(false);
  };

  const deleteGroup = () => {
    if (
      !selectedChat ||
      selectedChat.type !== "group"
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${selectedChat.name}" permanently?`
    );

    if (!confirmed) return;

    setChats((prev) =>
      prev.filter(
        (chat) => chat.id !== selectedChat.id
      )
    );

    setSelectedId(null);
    setShowMenu(false);
  };

  /* =========================
     UPDATE GROUP
  ========================= */

  const openUpdateGroup = () => {
    if (
      !selectedChat ||
      selectedChat.type !== "group"
    ) {
      return;
    }

    setUpdateName(selectedChat.name || "");
    setUpdateDescription(
      selectedChat.description || ""
    );
    setUpdatePhoto(selectedChat.photo || null);

    setShowUpdateGroup(true);
    setShowMenu(false);
  };

  const saveGroupUpdate = () => {
    if (!selectedChat) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              name:
                updateName.trim() ||
                chat.name,
              description: updateDescription,
              photo: updatePhoto,
              avatar:
                updateName.trim()
                  ? updateName
                      .trim()
                      .charAt(0)
                      .toUpperCase()
                  : chat.avatar,
            }
          : chat
      )
    );

    setShowUpdateGroup(false);
  };

  /* =========================
     ADD MEMBERS
  ========================= */

  const addMembers = () => {
    if (
      !selectedChat ||
      selectedChat.type !== "group"
    ) {
      return;
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              members: [
                ...(chat.members || []),
                ...selectedNewMembers,
              ],
            }
          : chat
      )
    );

    setSelectedNewMembers([]);
    setShowAddMember(false);
  };

  /* =========================
     CALLS
  ========================= */

  const startPhoneCall = () => {
    window.location.href = "tel:+919999999999";
  };

  const startVideoCall = () => {
    if (!selectedChat) return;

    const roomName = `CONEXA-${selectedChat.id}`;

    window.open(
      `https://meet.jit.si/${roomName}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     PROFILE PHOTO
  ========================= */

  const handleProfilePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setProfilePhoto(URL.createObjectURL(file));
  };

  /* =========================
     NO CHAT
  ========================= */

  if (!selectedChat) {
    return (
      <div
        className={`min-h-screen ${theme.page} flex items-center justify-center p-6`}
      >
        <div
          className={`w-full max-w-xl rounded-3xl border p-10 text-center shadow-sm ${theme.card}`}
        >
          <div
            className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${accentBg} text-white shadow-lg ${accentShadow}`}
          >
            <Icon name="plus" size={28} />
          </div>

          <h2 className="text-2xl font-bold">
            Welcome to CONEXA Chat
          </h2>

          <p
            className={`mt-2 text-sm ${theme.muted}`}
          >
            Create a group or start a conversation.
          </p>

          <button
            type="button"
            onClick={() => {
              setShowCreateGroup(true);
            }}
            className={`mt-7 inline-flex items-center gap-2 rounded-xl ${accentBg} px-5 py-3 text-sm font-semibold text-white shadow-lg ${accentShadow} transition hover:-translate-y-0.5`}
          >
            <Icon name="plus" size={17} />
            Create Group
          </button>
        </div>

        <CreateGroupModal
          isOpen={showCreateGroup}
          users={availableUsers}
          onClose={() =>
            setShowCreateGroup(false)
          }
          onCreateGroup={handleCreateGroup}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen min-h-[650px] overflow-hidden ${theme.page}`}
    >
      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`flex w-[360px] shrink-0 flex-col border-r ${theme.sidebar}`}
      >
        {/* SIDEBAR HEADER */}

        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <div
              className={`text-xl font-black tracking-[0.18em] ${accentText}`}
            >
              CONEXA
            </div>

            <div
              className={`mt-1 text-[11px] ${theme.muted}`}
            >
              Connections that matter
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* PROFILE */}

            <button
              type="button"
              onClick={() =>
                profilePhotoInput.current?.click()
              }
              className="relative"
              title="Change profile photo"
            >
              <Avatar
                name={CURRENT_USER.name}
                avatar={CURRENT_USER.avatar}
                photo={profilePhoto}
                size="md"
                darkMode={darkMode}
              />
            </button>

            <input
              ref={profilePhotoInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhoto}
            />

            {/* DARK / LIGHT MODE */}

            <button
              type="button"
              onClick={() =>
                setDarkMode((prev) => !prev)
              }
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                darkMode
                  ? "border-white/10 bg-white/[0.05] text-[#bcb4ff] hover:bg-[#7667e8]/20 hover:text-white"
                  : "border-[#e7e5f7] bg-[#f8f7ff] text-[#4B3F8F] hover:bg-[#eeeaff]"
              }`}
            >
              <Icon
                name={darkMode ? "sun" : "moon"}
                size={19}
              />
            </button>

            {/* CREATE GROUP */}

            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                setShowEmoji(false);
                setShowCreateGroup(true);
              }}
              title="Create group"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                darkMode
                  ? "border-white/10 bg-white/[0.05] text-[#bcb4ff] hover:bg-[#7667e8]/20 hover:text-white"
                  : "border-[#e7e5f7] bg-[#f8f7ff] text-[#4B3F8F] hover:bg-[#eeeaff]"
              }`}
            >
              <Icon name="plus" size={19} />
            </button>
          </div>
        </div>

        {/* SEARCH */}

        <div className="px-5">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${theme.input}`}
          >
            <Icon name="search" size={18} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search conversations"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* FILTER */}

        <div className="flex gap-2 px-5 py-4">
          {[
            ["all", "All"],
            ["direct", "Direct"],
            ["group", "Groups"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === value
                  ? `${accentBg} text-white`
                  : darkMode
                  ? "bg-white/[0.05] text-white/50 hover:bg-white/[0.08]"
                  : "bg-[#f2f0fa] text-[#89849b] hover:bg-[#ebe8f7]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CHAT LIST */}

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          <SectionTitle darkMode={darkMode}>
            Messages
          </SectionTitle>

          {filteredChats.length === 0 ? (
            <div
              className={`px-4 py-10 text-center text-sm ${theme.muted}`}
            >
              No conversations found.
            </div>
          ) : (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => selectChat(chat.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                  selectedId === chat.id
                    ? theme.active
                    : `border-transparent ${theme.hover}`
                }`}
              >
                <Avatar
                  name={chat.name}
                  avatar={chat.avatar}
                  photo={chat.photo}
                  size="md"
                  online={chat.online}
                  darkMode={darkMode}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">
                      {chat.name}
                    </span>

                    <span
                      className={`shrink-0 text-[10px] ${theme.muted}`}
                    >
                      {chat.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span
                      className={`truncate text-xs ${theme.muted}`}
                    >
                      {chat.messages?.length
                        ? chat.messages[
                            chat.messages.length - 1
                          ]?.text ||
                          chat.messages[
                            chat.messages.length - 1
                          ]?.fileName ||
                          "Attachment"
                        : "No messages yet"}
                    </span>

                    {chat.unread > 0 && (
                      <span
                        className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full ${accentBg} px-1.5 text-[10px] font-bold text-white`}
                      >
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* =========================
          MAIN CHAT
      ========================= */}

      <main className="flex min-w-0 flex-1 flex-col">
        {/* CHAT HEADER */}

        <header
          className={`flex h-[78px] shrink-0 items-center justify-between border-b px-6 ${theme.sidebar}`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              name={selectedChat.name}
              avatar={selectedChat.avatar}
              photo={selectedChat.photo}
              size="lg"
              online={selectedChat.online}
              darkMode={darkMode}
            />

            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-bold">
                {selectedChat.name}
              </h2>

              <p
                className={`mt-0.5 text-xs ${theme.muted}`}
              >
                {selectedChat.type === "group"
                  ? `${
                      selectedChat.members?.length || 0
                    } members`
                  : selectedChat.online
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>

          {/* HEADER ACTIONS */}

          <div className="relative flex items-center gap-1">
            <button
              type="button"
              onClick={startPhoneCall}
              title="Call"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${theme.hover}`}
            >
              <Icon name="phone" size={18} />
            </button>

            <button
              type="button"
              onClick={startVideoCall}
              title="Video call"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${theme.hover}`}
            >
              <Icon name="video" size={18} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
              title="More"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${theme.hover}`}
            >
              <Icon name="more" size={20} />
            </button>

            {/* THREE DOT MENU */}

            {showMenu && (
              <div
                onClick={(event) =>
                  event.stopPropagation()
                }
                className={`absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border p-1.5 shadow-xl ${
                  darkMode
                    ? "border-white/10 bg-[#1b1929]"
                    : "border-[#e8e5f3] bg-white"
                }`}
              >
                {selectedChat.type === "group" && (
                  <>
                    <button
                      type="button"
                      onClick={openUpdateGroup}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${theme.hover}`}
                    >
                      <Icon name="edit" size={17} />
                      Update Group
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddMember(true);
                        setShowMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${theme.hover}`}
                    >
                      <Icon name="users" size={17} />
                      Add Member
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowGroupMedia(true);
                        setShowMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${theme.hover}`}
                    >
                      <Icon name="image" size={17} />
                      Group Media
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowGroupInfo(true);
                        setShowMenu(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${theme.hover}`}
                    >
                      <Icon name="info" size={17} />
                      Group Info
                    </button>

                    <div
                      className={`my-1 border-t ${
                        darkMode
                          ? "border-white/10"
                          : "border-[#eeeaf7]"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={exitGroup}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-orange-500 ${theme.hover}`}
                    >
                      <Icon name="logOut" size={17} />
                      Exit Group
                    </button>

                    <button
                      type="button"
                      onClick={deleteGroup}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 ${theme.hover}`}
                    >
                      <Icon name="trash" size={17} />
                      Delete Group
                    </button>
                  </>
                )}

                {selectedChat.type !== "group" && (
                  <button
                    type="button"
                    onClick={deleteConversation}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 ${theme.hover}`}
                  >
                    <Icon name="trash" size={17} />
                    Delete Conversation
                  </button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* MESSAGES */}

        <div
          className={`min-h-0 flex-1 overflow-y-auto px-6 py-6 ${
            darkMode
              ? "bg-[#0e0d18]"
              : "bg-[#faf9fd]"
          }`}
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-3">
            {selectedChat.messages?.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-32">
                <div className="text-center">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                      darkMode
                        ? "bg-[#7667e8]/10 text-[#7667e8]"
                        : "bg-[#4B3F8F]/10 text-[#4B3F8F]"
                    }`}
                  >
                    <Icon name="users" size={25} />
                  </div>

                  <h3 className="font-semibold">
                    No messages yet
                  </h3>

                  <p
                    className={`mt-1 text-sm ${theme.muted}`}
                  >
                    Start the conversation.
                  </p>
                </div>
              </div>
            )}

            {selectedChat.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.own
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[72%] ${
                    msg.own
                      ? "items-end"
                      : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`overflow-hidden rounded-2xl px-4 py-3 text-sm ${
                      msg.own
                        ? `rounded-br-md ${accentBg} text-white`
                        : darkMode
                        ? "rounded-bl-md border border-white/10 bg-[#1a1827]"
                        : "rounded-bl-md border border-[#ebe8f4] bg-white"
                    }`}
                  >
                    {!msg.own &&
                      selectedChat.type ===
                        "group" && (
                        <div
                          className={`mb-1 text-[11px] font-semibold ${accentText}`}
                        >
                          {msg.sender}
                        </div>
                      )}

                    {msg.image && (
                      <img
                        src={msg.image}
                        alt={
                          msg.fileName || "Image"
                        }
                        className="mb-2 max-h-72 max-w-full rounded-xl object-cover"
                      />
                    )}

                    {msg.fileName &&
                      !msg.image && (
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mb-2 flex items-center gap-2 rounded-xl bg-black/10 px-3 py-2"
                        >
                          <Icon
                            name="file"
                            size={18}
                          />

                          <span className="max-w-[220px] truncate text-xs">
                            {msg.fileName}
                          </span>
                        </a>
                      )}

                    {msg.text && (
                      <div className="whitespace-pre-wrap break-words">
                        {msg.text}
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-1 flex items-center gap-1 px-1 text-[10px] ${theme.muted}`}
                  >
                    <span>{msg.time}</span>

                    {msg.own && (
                      <Icon name="check" size={12} />
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEnd} />
          </div>
        </div>

        {/* MESSAGE INPUT */}

        <div
          className={`border-t px-5 py-4 ${theme.sidebar}`}
        >
          <div
            className={`relative flex items-end gap-2 rounded-2xl border p-2 ${theme.input}`}
          >
            <input
              ref={messageFile}
              type="file"
              className="hidden"
              onChange={handleFile}
            />

            <button
              type="button"
              onClick={() =>
                messageFile.current?.click()
              }
              title="Attach file"
              className={`mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.hover}`}
            >
              <Icon
                name="paperclip"
                size={19}
              />
            </button>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="Type a message..."
              className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
            />

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowEmoji((prev) => !prev)
                }
                title="Emoji"
                className={`mb-0.5 flex h-10 w-10 items-center justify-center rounded-xl ${theme.hover}`}
              >
                <Icon
                  name="smile"
                  size={19}
                />
              </button>

              {showEmoji && (
                <div
                  className={`absolute bottom-12 right-0 z-40 grid w-64 grid-cols-8 gap-1 rounded-2xl border p-3 shadow-xl ${
                    darkMode
                      ? "border-white/10 bg-[#1b1929]"
                      : "border-[#e8e5f3] bg-white"
                  }`}
                >
                  {emojis.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => {
                        insertEmoji(emoji);
                        setShowEmoji(false);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-lg hover:bg-black/5"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                message.trim()
                  ? `${accentBg} text-white shadow-md ${accentShadow}`
                  : darkMode
                  ? "bg-white/[0.05] text-white/20"
                  : "bg-[#efedf5] text-[#b7b2c3]"
              }`}
            >
              <Icon name="send" size={18} />
            </button>
          </div>

          <div
            className={`mt-2 px-2 text-[10px] ${theme.muted}`}
          >
            Press Enter to send · Shift + Enter
            for a new line
          </div>
        </div>
      </main>

      {/* =========================
          CREATE GROUP MODAL
      ========================= */}

      <CreateGroupModal
        isOpen={showCreateGroup}
        users={availableUsers}
        onClose={() =>
          setShowCreateGroup(false)
        }
        onCreateGroup={handleCreateGroup}
      />

      {/* =========================
          GROUP INFO
      ========================= */}

      {showGroupInfo &&
        selectedChat.type === "group" && (
          <Modal
            darkMode={darkMode}
            onClose={() =>
              setShowGroupInfo(false)
            }
          >
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <h3 className="font-bold">
                  Group Info
                </h3>

                <p
                  className={`text-xs ${theme.muted}`}
                >
                  Details about this group
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowGroupInfo(false)
                }
                className="rounded-xl p-2 hover:bg-black/5"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  name={selectedChat.name}
                  avatar={selectedChat.avatar}
                  photo={selectedChat.photo}
                  size="xl"
                  darkMode={darkMode}
                />

                <h3 className="mt-4 text-lg font-bold">
                  {selectedChat.name}
                </h3>

                {selectedChat.description && (
                  <p
                    className={`mt-1 text-sm ${theme.muted}`}
                  >
                    {selectedChat.description}
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-black/[0.03] p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-50">
                  Members
                </div>

                <div className="space-y-2">
                  {(selectedChat.members || []).map(
                    (member, index) => (
                      <div
                        key={
                          member.id || index
                        }
                        className="flex items-center gap-3"
                      >
                        <Avatar
                          name={
                            member.name ||
                            "Member"
                          }
                          avatar={
                            member.avatar ||
                            member.name?.charAt(
                              0
                            ) ||
                            "M"
                          }
                          size="sm"
                          darkMode={darkMode}
                        />

                        <span className="text-sm font-medium">
                          {member.name ||
                            "Member"}
                        </span>
                      </div>
                    )
                  )}

                  {(selectedChat.members || [])
                    .length === 0 && (
                    <p
                      className={`text-sm ${theme.muted}`}
                    >
                      No members added yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}

      {/* =========================
          UPDATE GROUP
      ========================= */}

      {showUpdateGroup &&
        selectedChat.type === "group" && (
          <Modal
            darkMode={darkMode}
            onClose={() =>
              setShowUpdateGroup(false)
            }
          >
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <h3 className="font-bold">
                  Update Group Info
                </h3>

                <p
                  className={`text-xs ${theme.muted}`}
                >
                  Change your group details
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowUpdateGroup(false)
                }
                className="rounded-xl p-2 hover:bg-black/5"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    groupPhoto.current?.click()
                  }
                >
                  <Avatar
                    name={
                      updateName ||
                      selectedChat.name
                    }
                    avatar={
                      updateName?.charAt(0) ||
                      selectedChat.avatar
                    }
                    photo={updatePhoto}
                    size="xl"
                    darkMode={darkMode}
                  />
                </button>

                <input
                  ref={groupPhoto}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file =
                      event.target.files?.[0];

                    if (file) {
                      setUpdatePhoto(
                        URL.createObjectURL(file)
                      );
                    }
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Group Name
                </label>

                <input
                  value={updateName}
                  onChange={(event) =>
                    setUpdateName(
                      event.target.value
                    )
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${theme.input}`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Description
                </label>

                <textarea
                  value={updateDescription}
                  onChange={(event) =>
                    setUpdateDescription(
                      event.target.value
                    )
                  }
                  rows={3}
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none ${theme.input}`}
                />
              </div>

              <button
                type="button"
                onClick={saveGroupUpdate}
                className={`w-full rounded-xl ${accentBg} px-4 py-3 text-sm font-semibold text-white`}
              >
                Save Changes
              </button>
            </div>
          </Modal>
        )}

      {/* =========================
          ADD MEMBER
      ========================= */}

      {showAddMember &&
        selectedChat.type === "group" && (
          <Modal
            darkMode={darkMode}
            onClose={() =>
              setShowAddMember(false)
            }
          >
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <h3 className="font-bold">
                  Add Members
                </h3>

                <p
                  className={`text-xs ${theme.muted}`}
                >
                  Select people to add to the
                  group
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddMember(false)
                }
                className="rounded-xl p-2 hover:bg-black/5"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4">
              {availableUsers.map((user) => {
                const selected =
                  selectedNewMembers.some(
                    (member) =>
                      member.id === user.id
                  );

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      setSelectedNewMembers(
                        (prev) =>
                          selected
                            ? prev.filter(
                                (member) =>
                                  member.id !==
                                  user.id
                              )
                            : [
                                ...prev,
                                user,
                              ]
                      );
                    }}
                    className={`mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                      selected
                        ? darkMode
                          ? "bg-[#7667e8]/15"
                          : "bg-[#F0EDFF]"
                        : theme.hover
                    }`}
                  >
                    <Avatar
                      name={user.name}
                      avatar={user.avatar}
                      photo={user.photo}
                      size="md"
                      darkMode={darkMode}
                    />

                    <span className="flex-1 text-sm font-semibold">
                      {user.name}
                    </span>

                    {selected && (
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${accentBg} text-white`}
                      >
                        <Icon
                          name="check"
                          size={14}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-black/5 p-4">
              <button
                type="button"
                onClick={addMembers}
                className={`w-full rounded-xl ${accentBg} px-4 py-3 text-sm font-semibold text-white`}
              >
                Add{" "}
                {selectedNewMembers.length > 0
                  ? `${selectedNewMembers.length} `
                  : ""}
                Member
                {selectedNewMembers.length !== 1
                  ? "s"
                  : ""}
              </button>
            </div>
          </Modal>
        )}

      {/* =========================
          GROUP MEDIA
      ========================= */}

      {showGroupMedia &&
        selectedChat.type === "group" && (
          <Modal
            darkMode={darkMode}
            onClose={() =>
              setShowGroupMedia(false)
            }
          >
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <h3 className="font-bold">
                  Group Media
                </h3>

                <p
                  className={`text-xs ${theme.muted}`}
                >
                  Shared photos and files
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowGroupMedia(false)
                }
                className="rounded-xl p-2 hover:bg-black/5"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-5">
              {selectedChat.messages?.filter(
                (msg) =>
                  msg.image || msg.fileName
              ).length === 0 ? (
                <div
                  className={`py-12 text-center text-sm ${theme.muted}`}
                >
                  No media shared yet.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {selectedChat.messages
                    ?.filter(
                      (msg) =>
                        msg.image ||
                        msg.fileName
                    )
                    .map((msg) => (
                      <a
                        key={msg.id}
                        href={
                          msg.fileUrl ||
                          msg.image
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="overflow-hidden rounded-xl border border-black/5"
                      >
                        {msg.image ? (
                          <img
                            src={msg.image}
                            alt={
                              msg.fileName ||
                              "Shared"
                            }
                            className="aspect-square w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-square items-center justify-center p-3 text-center text-xs">
                            <div>
                              <Icon
                                name="file"
                                size={28}
                              />

                              <div className="mt-2 break-all">
                                {msg.fileName}
                              </div>
                            </div>
                          </div>
                        )}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </Modal>
        )}
    </div>
  );
};

export default ChatPage;