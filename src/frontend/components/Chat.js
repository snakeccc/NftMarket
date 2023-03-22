import React, { useState, useEffect } from "react";
import axios from "axios";
const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://api.openai.com/v1/engine/davinci-codex/completions",
        {
          prompt: "Hello, I am a chatbot. How can I assist you today?",
          max_tokens: 150,
          n: 1,
          stop: "\n",
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      setMessages([...messages, response.data.choices[0].text]);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://api.openai.com/v1/engine/davinci-codex/completions",
      {
        prompt: input,
        max_tokens: 150,
        n: 1,
        stop: "\n",
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    setMessages([...messages, input, response.data.choices[0].text]);
    setInput("");
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
