import React from 'react';

const UserMessage = ({ content }) => {
    if (!content) return null;
    
    return (
        <div className="flex w-full justify-end mb-4">
            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-[70%] shadow-sm">
                <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default UserMessage;