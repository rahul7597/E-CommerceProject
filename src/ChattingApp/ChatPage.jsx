const apiKey = 'AIzaSyAUGZwhh7mRcCQZaJQKqgYE4uJN-9LQhTk';

const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
import React, { useState } from 'react';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [response, setResponse] = useState('');

  // Define the API key directly (not recommended for production)
  const handleSendMessage = async () => {
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const prompt = newMessage;
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('API Error:', errorDetails);
        throw new Error(`API request failed with status ${response.status}: ${errorDetails}`);
      }
  
      const data = await response.json();
      setResponse(data.choices[0].text);
      setMessages([...messages, { message: newMessage, response: data.choices[0].text }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  
  
  
  return (
    <div className="chat-page">
      <h1>Chat Page</h1>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span className="username">You</span>
              <span className="message-text">{message.message}</span>
              <span className="response-text">{message.response}</span>
            </div>
          ))}
        </div>
        <div className="send-message">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
