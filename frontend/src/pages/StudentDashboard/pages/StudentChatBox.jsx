import React, { useState, useRef, useEffect } from "react";
import "./StudentChatBox.css";

const SAMPLE_CHATS = [
  {
    id: "t1",
    name: "Archi Jain",
    lastMsg: "Send the assignment pdf please",
    time: "10:22 AM",
    avatar: "/default-avatar.png",
    messages: [
      { id: 1, text: "Hey, did you complete today's task?", from: "teacher" },
      { id: 2, text: "Yes ma’am almost done!", from: "me" },
      { id: 3, text: "Send the assignment pdf please", from: "teacher" },
    ],
  },
  {
    id: "t2",
    name: "Alexa Rawles",
    lastMsg: "Tomorrow 3PM?",
    time: "Yesterday",
    avatar: "/default-avatar.png",
    messages: [
      { id: 1, text: "Are we meeting tomorrow?", from: "me" },
      { id: 2, text: "Tomorrow 3PM?", from: "teacher" },
    ],
  },
];

const StudentChatBox = () => {
  const [chats] = useState(SAMPLE_CHATS);
  const [activeChat, setActiveChat] = useState(SAMPLE_CHATS[0]);
  const [msg, setMsg] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (!msg.trim()) return;

    const newMsg = { id: Date.now(), text: msg, from: "me" };

    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setMsg("");

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  return (
    <div className="chatbox-wrapper">

      {/* LEFT CHAT LIST */}
      <aside className="chat-list">
        <input
          className="chat-search"
          placeholder="Search chats..."
        />

        <div className="chat-threads">
          {chats.map((c) => (
            <div
              key={c.id}
              className={`chat-thread ${activeChat.id === c.id ? "active" : ""}`}
              onClick={() => setActiveChat(c)}
            >
              <img src={c.avatar} className="chat-avatar" alt="" />
              <div className="chat-info">
                <div className="chat-name">{c.name}</div>
                <div className="chat-last">{c.lastMsg}</div>
              </div>
              <div className="chat-time">{c.time}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT CHAT WINDOW */}
      <section className="chat-window">
        <div className="chat-header">
          <img src={activeChat.avatar} alt="" className="chat-avatar" />
          <div>
            <h4>{activeChat.name}</h4>
            <span className="muted">Online</span>
          </div>
        </div>

        <div className="chat-messages">
          {activeChat.messages.map((m) => (
            <div
              key={m.id}
              className={`msg-bubble ${m.from === "me" ? "me" : "them"}`}
            >
              {m.text}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* SEND BOX */}
        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Type a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </section>
    </div>
  );
};

export default StudentChatBox;
