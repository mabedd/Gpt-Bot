"use client";

import { useState } from "react";
import { ChatCompletionMessage } from "./chat-completion-message.interface";
import createChatCompletion from "./createChatCompletion";

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessage = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];
    setMessages(updatedMessages);
    setMessage("");
    setIsTyping(true);

    try {
      const response = (await createChatCompletion(updatedMessages)).choices[0]
        ?.message;
      setMessages([...updatedMessages, response]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10 container mx-auto pl-4 pt-6 pr-4">
      <div className="flex flex-col gap-3 h-[75%] overflow-scroll w-full">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user" ? "chat chat-start" : "chat chat-end"
            }
          >
            <div className="chat-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat chat-end">
            <div className="chat-bubble">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await handleMessage();
          }
        }}
        className="input input-bordered w-full m-10"
      />
    </div>
  );
}
