import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && onSend) {
            onSend(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex items-center w-full bg-zinc-800/80 border border-zinc-700/50 backdrop-blur rounded-full px-2 py-1.5 shadow-lg transition-all focus-within:border-zinc-500 focus-within:bg-zinc-800"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type here..."
                    className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-500 px-4 py-2 focus:outline-none focus:ring-0 text-base"
                />

                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-zinc-100 text-zinc-900 disabled:opacity-50 disabled:bg-zinc-700 disabled:text-zinc-500 h-10 w-10 flex justify-center items-center rounded-full transition-colors hover:bg-white shrink-0 ml-2"
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
