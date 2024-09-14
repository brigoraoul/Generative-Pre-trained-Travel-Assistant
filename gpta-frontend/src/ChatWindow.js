import React, { useState } from 'react';
import './ChatWindow.css';
import axios from 'axios';

const ChatWindow = ({ editorContent, setEditorContent }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // get response via localhost flask app (http://127.0.0.1:5000/agent)
  const handleSubmit = async (e) => {
    //e.preventDefault();

    if (inputMessage.trim() === "") return;

    const newMessages = [...messages, { text: inputMessage, sender: "user" }];
    setMessages(newMessages);
    setInputMessage(""); // Clear the input field

    try {
      const response = await axios.post("http://127.0.0.1:5000/agent", {
        query: inputMessage,
      });

      const agentResponse = response.data.response;
      setMessages([...newMessages, { text: agentResponse, sender: "agent" }]);

    } catch (error) {
      console.error("Error fetching GPT response:", error);
      const errorMessage = { text: "Error fetching response", sender: "agent" };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  // get response via localhost open ai server (http://localhost:5001/api/chat)
  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { text: inputMessage, sender: 'You' };

      setMessages(prevMessages => [...prevMessages, userMessage]);

      try {
        // const fullPrompt = `${inputMessage}\n\nDocument in rich text format:\n${editorContent}`;
        const fullPrompt = inputMessage

        const response = await axios.post('http://localhost:5001/api/chat', {
          prompt: fullPrompt,
        });

        const gptMessage = { text: response.data.message, sender: 'GPTA' };

        setMessages(prevMessages => [...prevMessages, gptMessage]);
        setEditorContent(response.data.message);

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
      handleSubmit();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'agent' ? 'bot-message' : ''}`}>
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
        <button onClick={handleSubmit}>
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
