import React, { useState } from 'react';
import MessagesArea from '../components/MessagesArea';
import MessageInput from '../components/MessageInput';
import { invokeAi } from '../services/ai.api';

const ArenaChatInterface = () => {
    // Mock data for initial state or future integration
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (message) => {
        setMessages((prev) => [...prev, { problem: message }]);

        const data = await invokeAi({ problem: message });

        console.log(data);

        setMessages((prev) => [
            ...prev.slice(0, -1),
            { ...prev[prev.length - 1], ...data.result }
        ]);
    };

    return (
        <main className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-sans">
            <h1 className="sr-only">AI Battle Arena</h1>
            <header className="flex-none p-4 md:px-8 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
                <div className="max-w-5xl mx-auto flex items-center">
                    <span className="font-semibold text-xl tracking-tight text-white">
                        Arena
                    </span>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-5xl mx-auto w-full pb-32 pt-8">
                    <MessagesArea messages={messages} />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pb-6 pt-12">
                <div className="max-w-3xl mx-auto w-full px-4">
                    <MessageInput onSend={handleSendMessage} />
                </div>
            </div>
        </main>
    );
};

export default ArenaChatInterface;
