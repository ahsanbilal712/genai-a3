'use client';

import { useState } from 'react';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';
import { Message } from './types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    console.log('Submitting text:', text);
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: data.english,
        translation: data.urdu,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-white">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center">English to Urdu Translator</h1>
      </header>
      <MessageList messages={messages} />
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </main>
  );
}