import { Message } from '../types';

interface Props {
    messages: Message[];
}

export default function MessageList({ messages }: Props) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                            <p className="text-gray-800">{message.text}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                            <p className="text-gray-800 text-right" dir="rtl">
                                {message.translation}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}