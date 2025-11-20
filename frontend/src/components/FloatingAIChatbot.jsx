import React, { useState } from 'react';
import './FloatingAIChatbot.css';

const FloatingAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I am unable to respond right now. Please try again later.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <div className="floating-chat-btn" onClick={toggleChat}>
        <span>💬</span>
      </div>

      {isOpen && (
        <div className="floating-chat-window">
          <div className="floating-chat-header">
            <h3>AI Assistant</h3>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="floating-chat-messages">
            {messages.length === 0 && (
              <div className="floating-chat-bubble bot">
                <p>Hello! I'm your AI assistant. How can I help you today?</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`floating-chat-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="floating-chat-bubble bot">
                <p>Typing...</p>
              </div>
            )}
          </div>

          <div className="floating-chat-input-area">
            <input
              type="text"
              className="floating-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button className="floating-chat-send-btn" onClick={sendMessage} disabled={isLoading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIChatbot;
