'use client';

import { FormEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface Props {
    onSubmit: (text: string) => void;
    isLoading: boolean;
}

export default function ChatInput({ onSubmit, isLoading }: Props) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSubmit(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type English text here..."
                className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
                <FiSend size={20} />
            </button>
        </form>
    );
}