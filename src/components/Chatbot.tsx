"use client"




/*
import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import axios from 'axios';

type Message = {
  author: string;
  message: React.ReactNode;
};

type ChatbotProps = {
  messages: Message[];
  onMessageSubmit: (message: React.ReactNode) => void;
};

const ChatbotComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleUserMessage = async (message: React.ReactNode) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { author: 'user', message },
    ]);

    try {
      const response = await axios.post(
        'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask',
        { query: message },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'd2f3dc4321mshc24366b6a9d2bb6p1de96ejsn9c6813e944fc', // Replace with your API key
            'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
          },
        }
      );

      if (response.data && response.data.response) {
        const chatbotResponse = response.data.response;
        setMessages((prevMessages) => [
          ...prevMessages,
          { author: 'bot', message: chatbotResponse },
        ]);
      } else {
        console.error('Error communicating with ChatGPT API: response.data.response is undefined');
        // Handle errors and display user-friendly messages
      }
    } catch (error) {
      console.error('Error communicating with ChatGPT API:', error);
      // Handle errors and display user-friendly messages
    }
  };

  const chatbotProps: ChatbotProps = {
    messages: messages,
    onMessageSubmit: handleUserMessage,
  };

  const config = {
    // Ensure initialMessages is an array of IMessage
    initialMessages: [
      { type: 'bot', id: 1, author: 'bot', message: 'Hello! How can I help you today?' },
    ],
  };

  return <Chatbot actionProvider={undefined} messageParser={undefined} config={config} {...chatbotProps} />;
};

export default ChatbotComponent;
*/