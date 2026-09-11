import React, { useEffect, useMemo, useState } from "react";

import ChatList from "../../components/Chat/ChatList";
import ChatWindow from "../../components/Chat/ChatWindow";
import EmptyChat from "../../components/Chat/EmptyChat";

import "./ChatPage.css";

const initialUsers = [
  {
    id: 1,
    name: "Vedika Mamidwar",
    phone: "+91 9876543210",
    avatar: "",
    online: true,
    type: "user",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "+91 9876543211",
    avatar: "",
    online: true,
    type: "user",
  },
  {
    id: 3,
    name: "Priya Patil",
    phone: "+91 9876543212",
    avatar: "",
    online: false,
    type: "user",
  },
  {
    id: 4,
    name: "Aman Singh",
    phone: "+91 9876543213",
    avatar: "",
    online: true,
    type: "user",
  },
  {
    id: 5,
    name: "Sneha Joshi",
    phone: "+91 9876543214",
    avatar: "",
    online: false,
    type: "user",
  },
];

const ChatPage = () => {
  const [users] = useState(initialUsers);

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("conexa-chats");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: "user-1",
        name: "Vedika Mamidwar",
        phone: "+91 9876543210",
        avatar: "",
        online: true,
        type: "user",
        lastMessage: "Great! Let's discuss the project.",
        time: "2:37 PM",
        unread: 2,
      },
      {
        id: "user-2",
        name: "Rahul Sharma",
        phone: "+91 9876543211",
        avatar: "",
        online: true,
        type: "user",
        lastMessage: "Let's discuss the project.",
        time: "1:20 PM",
        unread: 0,
      },
      {
        id: "user-3",
        name: "Priya Patil",
        phone: "+91 9876543212",
        avatar: "",
        online: false,
        type: "user",
        lastMessage: "Can you share the document?",
        time: "Yesterday",
        unread: 5,
      },
    ];
  });

  const [activeChat, setActiveChat] = useState(null);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("conexa-messages");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      "user-1": [
        {
          id: 1,
          sender: "other",
          text: "Hey! Are you joining the team?",
          time: "2:35 PM",
          seen: true,
        },
        {
          id: 2,
          sender: "me",
          text: "Yes! I'm interested in joining.",
          time: "2:36 PM",
          seen: true,
        },
        {
          id: 3,
          sender: "other",
          text: "Great! Let's discuss the project.",
          time: "2:37 PM",
          seen: true,
        },
      ],
    };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("conexa-theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("conexa-chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("conexa-messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("conexa-theme", theme);
  }, [theme]);

  const activeMessages = useMemo(() => {
    if (!activeChat) return [];

    return messages[activeChat.id] || [];
  }, [activeChat, messages]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);

    setChats((previousChats) =>
      previousChats.map((item) =>
        item.id === chat.id
          ? { ...item, unread: 0 }
          : item
      )
    );
  };

  const handleSendMessage = (message) => {
    if (!activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: message.text || "",
      file: message.file || null,
      type: message.type || "text",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      seen: true,
    };

    setMessages((previous) => ({
      ...previous,
      [activeChat.id]: [
        ...(previous[activeChat.id] || []),
        newMessage,
      ],
    }));

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === activeChat.id
          ? {
              ...chat,
              lastMessage:
                message.type === "file"
                  ? `📎 ${message.file?.name}`
                  : message.text,
              time: newMessage.time,
            }
          : chat
      )
    );
  };

  const handleCreateGroup = (group) => {
    const newGroup = {
      id: `group-${Date.now()}`,
      name: group.name,
      avatar: group.avatar || "",
      members: group.members,
      type: "group",
      online: false,
      lastMessage: "Group created",
      time: "Now",
      unread: 0,
    };

    setChats((previous) => [
      newGroup,
      ...previous,
    ]);

    setMessages((previous) => ({
      ...previous,
      [newGroup.id]: [
        {
          id: Date.now(),
          sender: "system",
          text: `You created "${group.name}"`,
          time: "Now",
          type: "system",
          seen: true,
        },
      ],
    }));

    setActiveChat(newGroup);
  };

  return (
    <div className={`chat-page ${theme}`}>
      <div className="chat-sidebar">
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          users={users}
          onCreateGroup={handleCreateGroup}
          theme={theme}
          setTheme={setTheme}
        />
      </div>

      <div className="chat-main">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            messages={activeMessages}
            onSendMessage={handleSendMessage}
            users={users}
            onExitGroup={handleExitGroup}
            onDeleteChat={handleDeleteChat}
            onUpdateProfile={handleUpdateProfile}
         />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
};
const handleExitGroup = (group) => {
  setChats((previousChats) =>
    previousChats.filter(
      (chat) => chat.id !== group.id
    )
  );

  setActiveChat(null);

  setMessages((previousMessages) => {
    const updated = { ...previousMessages };

    delete updated[group.id];

    return updated;
  });
};


const handleDeleteChat = (chat) => {
  setChats((previousChats) =>
    previousChats.filter(
      (item) => item.id !== chat.id
    )
  );

  setActiveChat(null);

  setMessages((previousMessages) => {
    const updated = { ...previousMessages };

    delete updated[chat.id];

    return updated;
  });
};


const handleUpdateProfile = (chat) => {
  const newName = window.prompt(
    "Enter new name:",
    chat.name
  );

  if (!newName?.trim()) return;

  setChats((previousChats) =>
    previousChats.map((item) =>
      item.id === chat.id
        ? {
            ...item,
            name: newName.trim(),
          }
        : item
    )
  );

  setActiveChat((previous) =>
    previous
      ? {
          ...previous,
          name: newName.trim(),
        }
      : previous
  );
};
export default ChatPage;