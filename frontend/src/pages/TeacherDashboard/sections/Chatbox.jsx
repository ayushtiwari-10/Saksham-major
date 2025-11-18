import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import "./Chatbox.css";

const Chatbox = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(null);

  const handleNavigate = (section) => {
    const routes = {
      "Dashboard": "/teacher/dashboard",
      "My Videos": "/teacher/dashboard/videos",
      "Schedule": "/teacher/dashboard/schedule",
      "ChatBox": "/teacher/dashboard/chatbox",
      "Finances": "/teacher/dashboard/finances" // assuming a route for finances
    };
    navigate(routes[section] || "/teacher/dashboard");
  };

  const people = [
    { id: 1, name: "Aditi Sharma", lastMsg: "Okay noted!", unread: 2 },
    { id: 2, name: "John Mathew", lastMsg: "Send me the link", unread: 1 },
    { id: 3, name: "Priya", lastMsg: "Thanks!", unread: 0 },
    { id: 4, name: "Meena", lastMsg: "Got it", unread: 0 },
  ];

  return (
    <div className="chat-root">
      <Sidebar active="ChatBox" onNavigate={handleNavigate} />
      <div className="chat-main">
        <Topbar title="Chatbox" />

        <div className="chat-container">
          {/* LEFT LIST */}
          <div className="chat-left">
            <div className="search-bar">
              <input placeholder="Search your people" />
            </div>

            <div className="chat-list">
              {people.map((p) => (
                <div
                  key={p.id}
                  className={`chat-item ${
                    activeChat === p.id ? "active" : ""
                  }`}
                  onClick={() => setActiveChat(p.id)}
                >
                  <div className="chat-icon">👤</div>
                  <div>
                    <h4>{p.name}</h4>
                    <p>{p.lastMsg}</p>
                  </div>
                  {p.unread > 0 && <span className="unread">{p.unread}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CHAT WINDOW */}
          <div className="chat-right">
            {!activeChat ? (
              <div className="empty-chat">Select a chat to start messaging</div>
            ) : (
              <>
                <div className="chat-header">
                  <div className="header-icon">👤</div>
                  <h3>{people.find((x) => x.id === activeChat).name}</h3>

                  <div className="chat-actions">
                    <button>📞</button>
                    <button>🎥</button>
                    <button>⋮</button>
                  </div>
                </div>

                <div className="chat-messages">
                  {/* DEMO MESSAGES */}
                  <div className="msg-left">Hello!</div>
                  <div className="msg-right">Hi! How can I help you?</div>
                </div>

                {/* INPUT BOX */}
                <div className="chat-input-area">
                  <button className="plus-btn">＋</button>
                  <input placeholder="Type message here…" />
                  <button className="emoji-btn">😊</button>
                  <button className="mic-btn">🎙️</button>
                  <button className="send-btn">🡆</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
