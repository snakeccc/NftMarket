import React, { useState } from "react";
import openai from "openai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const askGpt = async (question) => {
    const response = await openai.complete({
      engine: "text-davinci-002",
      prompt: `Q: ${question}\nA:`,
      maxTokens: 100,
      n: 1,
      stop: "\n",
    });

    return response.data.choices[0].text.trim();
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      const newMessage = {
        text: inputValue,
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const answer = await askGpt(inputValue);

      const botMessage = {
        text: answer,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setInputValue("");
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser ? "user-message" : "bot-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message and press Enter"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chat;
