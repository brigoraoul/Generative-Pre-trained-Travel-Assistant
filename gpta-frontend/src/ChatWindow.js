import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, sender: 'You' };
  
      // Extract the first word from the input
      const firstWord = inputMessage.split(' ')[0];
      
      // Add bot response with the first word
      const botMessage = { text: firstWord, sender: 'GPTA' };
  
      // Update messages state with both the user and bot messages at once
      setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);
  
      // Clear the input field
      setInputMessage('');
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'GPTA' ? 'bot-message' : ''}`}>
            <span>{msg.sender}: {msg.text}</span>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
