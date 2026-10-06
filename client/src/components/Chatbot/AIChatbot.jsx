import React, { useState } from "react";

const suggestedQuestions = [
  "What is CONEXA?",
  "How can I find teammates?",
  "How does teammate matching work?",
  "How do I create a team?",
  "How do I start a chat?",
];

const botResponses = {
  "What is CONEXA?":
    "CONEXA is a team-finder platform that helps students and developers discover compatible teammates based on their skills, interests, and project goals.",

  "How can I find teammates?":
    "You can find teammates by going to the Find Teammates section. CONEXA helps you discover people based on their skills, interests, and compatibility.",

  "How does teammate matching work?":
    "CONEXA compares skills, interests, and project preferences to help you discover teammates who may be a good match for your project.",

  "How do I create a team?":
    "Go to the Build Team section, select the teammates you want to work with, and create your team. You can then collaborate with your team members.",

  "How do I start a chat?":
    "You can start a conversation from a teammate's profile or through the Chat section. Select a teammate and send your first message!",
};

function getBotResponse(message) {
  const normalizedMessage = message.toLowerCase().trim();

  if (botResponses[message]) {
    return botResponses[message];
  }

  if (
    normalizedMessage.includes("hello") ||
    normalizedMessage.includes("hi") ||
    normalizedMessage.includes("hey")
  ) {
    return "Hey! 👋 I'm CONEXA AI. I can help you understand CONEXA, find teammates, build teams, and use the platform.";
  }

  if (
    normalizedMessage.includes("conexa") ||
    normalizedMessage.includes("what is conexa")
  ) {
    return "CONEXA is a platform designed to help students and developers find compatible teammates, build teams, and collaborate on projects.";
  }

  if (
    normalizedMessage.includes("teammate") ||
    normalizedMessage.includes("team mate")
  ) {
    return "You can find potential teammates through the Find Teammates section. CONEXA considers skills, interests, and compatibility to help you discover suitable people.";
  }

  if (
    normalizedMessage.includes("match") ||
    normalizedMessage.includes("matching")
  ) {
    return "CONEXA uses teammate information such as skills, interests, and project preferences to help identify compatible teammates.";
  }

  if (
    normalizedMessage.includes("team") ||
    normalizedMessage.includes("create a team")
  ) {
    return "To create a team, head to the Build Team section and select the people you want to collaborate with.";
  }

  if (
    normalizedMessage.includes("chat") ||
    normalizedMessage.includes("message")
  ) {
    return "You can chat with your teammates through the CONEXA Chat section. Open a teammate's conversation and send your message.";
  }

  if (
    normalizedMessage.includes("help") ||
    normalizedMessage.includes("help me")
  ) {
    return "Of course! 😊 You can ask me about CONEXA, finding teammates, matching, creating teams, or chatting with teammates.";
  }

  return "I'm still learning about CONEXA. 🤖 Try asking me about finding teammates, teammate matching, creating a team, or starting a chat.";
}

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm CONEXA AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (messageText) => {
    const message = messageText.trim();

    if (!message) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(message),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "#1E1B4B",
            color: "#FFFFFF",
            fontSize: "26px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(30, 27, 75, 0.3)",
            zIndex: 9999,
            transition: "all 0.2s ease",
          }}
          aria-label="Open CONEXA AI"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "370px",
            height: "560px",
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 15px 50px rgba(15, 23, 42, 0.2)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            border: "1px solid #E2E8F0",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#1E1B4B",
              color: "#FFFFFF",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#14B8A6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ✦
              </div>

              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  CONEXA AI
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    opacity: 0.85,
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#2DD4BF",
                    }}
                  />

                  Online
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#FFFFFF",
                fontSize: "22px",
                cursor: "pointer",
                padding: "4px 8px",
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px",
              background: "#F8FAFC",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "11px 14px",
                    borderRadius:
                      message.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      message.sender === "user" ? "#1E1B4B" : "#FFFFFF",
                    color:
                      message.sender === "user" ? "#FFFFFF" : "#0F172A",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    boxShadow:
                      message.sender === "bot"
                        ? "0 2px 8px rgba(15, 23, 42, 0.06)"
                        : "none",
                    border:
                      message.sender === "bot"
                        ? "1px solid #E2E8F0"
                        : "none",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div style={{ marginTop: "18px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748B",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  You can ask me:
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      style={{
                        textAlign: "left",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        color: "#312E81",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "12px",
              background: "#FFFFFF",
              borderTop: "1px solid #E2E8F0",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask CONEXA AI..."
              style={{
                flex: 1,
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "11px 13px",
                outline: "none",
                fontSize: "13px",
                color: "#0F172A",
                background: "#F8FAFC",
              }}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                border: "none",
                background: input.trim() ? "#14B8A6" : "#CBD5E1",
                color: "#FFFFFF",
                cursor: input.trim() ? "pointer" : "not-allowed",
                fontSize: "17px",
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIChatbot;