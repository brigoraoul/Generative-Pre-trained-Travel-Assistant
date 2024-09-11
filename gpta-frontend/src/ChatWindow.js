import React, { useState } from 'react';
import './ChatWindow.css';
import axios from 'axios';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, sender: 'You' };

      // Add user's message to the chat first
      setMessages(prevMessages => [...prevMessages, userMessage]);

      try {
        // Send the user's message to the server
        const response = await axios.post('http://localhost:5001/api/chat', {
          prompt: inputMessage,
        });

        // Get the GPT response from the server
        const gptMessage = { text: response.data.message, sender: 'GPTA' };

        // Update the messages with the GPT response
        setMessages(prevMessages => [...prevMessages, gptMessage]);
      } catch (error) {
        console.error('Error fetching GPT response:', error);
        const errorMessage = { text: 'Error: Unable to get a response from GPT', sender: 'GPTA' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }

      // Clear the input field
      setInputMessage('');
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // Trigger the send button on 'Enter' key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
          onKeyDown={handleKeyPress}  // Add this to handle Enter key
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>
          {/* Send icon (you can use an SVG icon or a FontAwesome icon if integrated) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="send-icon"
            width="24" height="24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
